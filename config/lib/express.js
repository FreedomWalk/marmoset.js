'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
    express = require('express'),
    expressDomain = require('express-domain-middleware'),
    morgan = require('morgan'),
    logger = require('./logger'),
    stomp = require('./stomp'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    flash = require('connect-flash'),
    consolidate = require('consolidate'),
    path = require('path'),
    _ = require('lodash'),
    lusca = require('lusca'),
    jwt = require('express-jwt'),
    jsonwebtoken = require('jsonwebtoken'),
    UnauthorizedError = require('../error/UnauthorizedError'),
    wechat = require('wechat');
const unless = require('express-unless');

/**
 * Initialize local variables
 */
module.exports.initLocalVariables = initLocalVariables;

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = initMiddleware;

/**
 * Configure view engine
 */
module.exports.initViewEngine = initViewEngine;

/**
 * Configure Express session
 */
module.exports.initSession = initSession;

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = initModulesConfiguration;

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = initHelmetHeaders;

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = initModulesClientRoutes;

/**
 * Configure the modules ACL policies
 */
module.exports.initModulesServerPolicies = initModulesServerPolicies;

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = initModulesServerRoutes;

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = initErrorRoutes;

module.exports.initSchedules = initSchedules;

module.exports.initMQSubscribe = initMQSubscribe;

/**
 * Configure Socket.io
 */
module.exports.configureSocketIO = configureSocketIO;

module.exports.initWechat = initWechat;

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
    // Initialize express app
    var app = express();

    // Initialize local variables
    this.initLocalVariables(app);

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize Express view engine
    this.initViewEngine(app);

    // Initialize Helmet security headers
    this.initHelmetHeaders(app);

    // Initialize modules static client routes, before session!
    this.initModulesClientRoutes(app);

    // Initialize Express session
    this.initSession(app, db);

    // Initialize wechat
    this.initWechat(app);

    // Initialize Modules configuration
    this.initModulesConfiguration(app);

    // Initialize modules server authorization policies
    this.initModulesServerPolicies(app);

    // Initialize modules server routes
    this.initModulesServerRoutes(app);

    // Initialize error routes
    this.initErrorRoutes(app);

    this.initSchedules();

    this.initMQSubscribe();
    // Configure Socket.io
    app = this.configureSocketIO(app, db);

    return app;
};


function initLocalVariables(app) {
    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    if (config.secure && config.secure.ssl === true) {
        app.locals.secure = config.secure.ssl;
    }
    app.locals.keywords = config.app.keywords;
    app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
}

function initViewEngine(app) {
    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
}

function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader(
                'Content-Type'));
        },
        level: 9
    }));
    app.use(expressDomain);

    app.use('/api', jwt({
        secret: config.jwt.secret,
        credentialsRequired: true,
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expiresIn,
        getToken: getToken
    }).unless({
        path: config.jwt.unless
    }));

    app.use('/api', function (err, req, res, next) {
        if (err && err.name === 'UnauthorizedError') {
            res.status(401).json('Unauthorized');
        }
    });

    updateToken.unless = unless;
    app.use('/api', updateToken.unless({
        path: config.jwt.unless
    }));

    // Initialize favicon middleware
    app.use(favicon(app.locals.favicon));

    // Enable logger (morgan) if enabled in the configuration file
    if (_.has(config, 'log.format')) {
        app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    }

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    app.use(flash());

    function updateToken(req, res, next) {
        let user = req.user;
        if (user) {
            //if (user.exp - (Date.now() / 1000) <= 60) {
            let token = jsonwebtoken.sign({
                userId: user.userId,
                roles: user.roles,
                username: user.username
            }, config.jwt.secret, {
                algorithm: config.jwt.algorithm,
                expiresIn: config.jwt.expiresIn
            });
            res.setHeader('Authorization', 'Bearer ' + token);
            res.setHeader('Set-Cookie', 'token=' + token);
            //}
        }
        next();
    }

    // app.use('/api',jwt({ secret: config.jwt.secret}).unless({path: config.jwt.unless}));
    function getToken(req, res, next) {
        if (req.headers && req.headers.authorization) {
            var parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
                var scheme = parts[0];
                var credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    return credentials;
                } else {
                    return next(new UnauthorizedError(
                        'credentials_bad_scheme', {
                            message: 'Format is Authorization: Bearer [token]'
                        }));
                }
            } else {
                return next(new UnauthorizedError('credentials_bad_format', {
                    message: 'Format is Authorization: Bearer [token]'
                }));
            }
        } else {
            // 获得客户端的Cookie
            var Cookies = {};
            req.headers.cookie && req.headers.cookie.split(';').forEach(
                function (Cookie) {
                    var parts = Cookie.split('=');
                    Cookies[parts[0].trim()] = (parts[1] || '').trim();
                });

            if (Cookies.token) {
                return Cookies.token;
            } else {
                if (req.query && req.query.token) {
                    return req.query.token;
                } else {
                    return null;
                }
            }
        }
    }
}

function initSession(app, db) {
    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly,
            secure: config.sessionCookie.secure && config.secure.ssl
        },
        name: config.sessionKey,
        store: new MongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        })
    }));

    // Add Lusca CSRF Middleware
    app.use(lusca(config.csrf));
}

function initModulesConfiguration(app, db) {
    config.files.server.configs.forEach(function (configPath) {
        require(path.resolve(configPath))(app, db);
    });
}

function initHelmetHeaders(app) {
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
}

function initModulesClientRoutes(app) {
    // Setting the app router and static folder
    app.use('/', express.static(path.resolve('./public')));

    // Globbing static routing
    config.folders.client.forEach(function (staticPath) {
        app.use(staticPath, express.static(path.resolve('./' + staticPath)));
    });
}

function initWechat(app) {
    let weConfig = config.wechat;
    app.use('/wechat', wechat(weConfig.token).text(function (message, req, res, next) {
        // message为文本内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125035',
        // MsgType: 'text',
        // Content: 'http',
        // MsgId: '5837397576500011341' }
        console.log(message.FromUserName);
        req.wxsession.text += message.Content;
        res.reply(req.wxsession.text);
    }).image(function (message, req, res, next) {
        // message为图片内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359124971',
        // MsgType: 'image',
        // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
        // MediaId: 'media_id',
        // MsgId: '5837397301622104395' }
        res.reply({
            type: 'image',
            content: {
                mediaId: message.MediaId
            }
        });
    }).voice(function (message, req, res, next) {
        // message为音频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'voice',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // Format: 'amr',
        // MsgId: '5837397520665436492' }
        res.reply({
            type: 'voice',
            content: {
                mediaId: message.MediaId
            }
        });
    }).video(function (message, req, res, next) {
        // message为视频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'video',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // ThumbMediaId: 'media_id',
        // MsgId: '5837397520665436492' }
        res.reply({
            type: 'video',
            content: {
                mediaId: message.MediaId
            }
        });
    }).shortvideo(function (message, req, res, next) {
        // message为短视频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'shortvideo',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // ThumbMediaId: 'media_id',
        // MsgId: '5837397520665436492' }
        res.reply({
            type: 'shortvideo',
            content: {
                mediaId: message.MediaId
            }
        });
    }).location(function (message, req, res, next) {
        // message为位置内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125311',
        // MsgType: 'location',
        // Location_X: '30.283950',
        // Location_Y: '120.063139',
        // Scale: '15',
        // Label: {},
        // MsgId: '5837398761910985062' }
        res.reply({
            type: 'location',
            content: {
                mediaId: message.MediaId
            }
        });
    }).link(function (message, req, res, next) {
        // message为链接内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'link',
        // Title: '公众平台官网链接',
        // Description: '公众平台官网链接',
        // Url: 'http://1024.com/',
        // MsgId: '5837397520665436492' }
        res.reply({
            type: 'link',
            content: {
                mediaId: message.MediaId
            }
        });
    }).event(function (message, req, res, next) {
        // message为事件内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'event',
        // Event: 'LOCATION',
        // Latitude: '23.137466',
        // Longitude: '113.352425',
        // Precision: '119.385040',
        // MsgId: '5837397520665436492' }
        res.reply({
            type: 'event',
            content: {
                mediaId: message.MediaId
            }
        });
    }).middlewarify());
}

function initModulesServerPolicies() {
    // Globbing policy files
    config.files.server.policies.forEach(function (policyPath) {
        require(path.resolve(policyPath)).invokeRolesPolicies();
    });
}

function initModulesServerRoutes(app) {
    // Globbing routing files
    config.files.server.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

function initErrorRoutes(app) {
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {
            return next();
        } else {
            // Log it
            logger.error(err.stack);


            if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') >= 0) {
                res.status(500).send({
                    message: err.message
                });
            } else {
                // Redirect to error page
                res.redirect('/server-error');
            }

        }
    });
}

function initSchedules() {
    // Globbing routing files
    config.files.server.schedules.forEach(function (routePath) {
        require(path.resolve(routePath))();
    });
}

function initMQSubscribe() {
    let msgDealers = [];
    config.files.server.receivers.forEach(function (routePath) {
        msgDealers.push(require(path.resolve(routePath)));
    });
    stomp.subscribe(msgDealers);
}

function configureSocketIO(app, db) {
    // Load the Socket.io configuration
    var server = require('./socket.io')(app, db);

    // Return server object
    return server;
}
