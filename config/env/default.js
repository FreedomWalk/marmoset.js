'use strict';

module.exports = {
    app: {
        title: 'MARMOSET.JS',
        description: 'MARMOSET MARMOSET MARMOSET',
        keywords: 'marmoset, mongodb, express, angularjs, node.js, mongoose, passport, bootstrap',
        googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID ||
        'GOOGLE_ANALYTICS_TRACKING_ID'
    },
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    templateEngine: 'swig',
    // Session Cookie settings
    sessionCookie: {
        // session expiration is set by default to 24 hours
        maxAge: 24 * (60 * 60 * 1000),
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false
    },
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'MEAN',
    // sessionKey is the cookie session name
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    // Lusca config
    csrf: {
        csrf: false,
        csp: {/* Content Security Policy object */},
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        xssProtection: true
    },
    logo: 'modules/core/client/img/brand/logo.jpg',
    favicon: 'modules/core/client/img/brand/favicon.ico',
    uploads: {
        profileUpload: {
            dest: './modules/users/client/img/profile/uploads/', // Profile upload destination path
            limits: {
                fileSize: 10 * 1024 * 1024 // Max file size in bytes (10 MB)
            }
        }
    },
    jwt: {
        unless: [/\/api\/auth\/.+/gi, /\/api\/wechat\/.+/gi,
            /\/api\/checkCode.+/gi, '/api/checkCode', '/api/shuangseqiu',/\/api\/shuangseqiu\/.+/gi]
    },
    email: {
        smtpServer: 'smtpServer:pass@email',
        from: 'email'
    },
    wechat: {
        token: 'testNode',
        appid: 'wxb78dd47e80dba61f',
        appsecret: 'bb6f60fb4dc65bfcceedd6b721172fab'
    },
    captcha: {
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        delayTime: 5 * 60 * 1000,
        letters: 6,
        key: 'secret',
        captchaBaseUrl: 'http://image.captchas.net',
        client: 'clientName'
    }
};
