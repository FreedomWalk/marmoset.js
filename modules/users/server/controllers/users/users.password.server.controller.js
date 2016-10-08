'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    config = require(path.resolve('./config/config')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    // nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto');
const smtpSender = require(path.resolve('./config/lib/smtp'));
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));
// var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function (req, res, next) {
    async.waterfall([
        // Generate random token
        function (done) {
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Lookup user by username
        function (token, done) {
            if (req.body.email) {
                User.findOne({
                    email: req.body.email.toLowerCase()
                }, '-salt -password', function (err, user) {
                    if (err || !user) {
                        return res.status(500).send({
                            message: 'No account with that username has been found'
                        });
                    } else if (user.provider !== 'local') {
                        return res.status(500).send({
                            message: 'It seems like you signed up using your ' + user.provider + ' account'
                        });
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.update({resetPasswordToken:token, resetPasswordExpires: Date.now() + 3600000}, function (err) {
                            done(err, token, user);
                        });
                    }
                });
            } else {
                return res.status(500).send({
                    message: 'Username field must not be blank'
                });
            }
        },
        function (token, user, done) {

            var httpTransport = 'http://';
            if (config.secure && config.secure.ssl === true) {
                httpTransport = 'https://';
            }
            res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
                name: user.displayName,
                appName: config.app.title,
                url: httpTransport + req.headers.host + '/api/auth/reset/' + token
            }, function (err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            };
            let receivers = [mailOptions.to];
            smtpSender.sendHtml(receivers, 'Password Reset', emailHTML).then(function () {
                res.send({
                    message: 'An email has been sent to the provided email with further instructions.'
                });
                done();
            }, function (err) {
                logger.error(err);
                throw new CommonError('发送失败，请稍后再试');
            });
            // smtpTransport.sendMail(mailOptions, function (err) {
            //     if (!err) {
            //         res.send({
            //             message: 'An email has been sent to the provided email with further instructions.'
            //         });
            //     } else {
            //         return res.status(500).send({
            //             message: 'Failure sending email'
            //         });
            //     }
            //
            //     done(err);
            // });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
    });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function (req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {
        if (err || !user) {
            return res.redirect('/password/reset/invalid');
        }

        res.redirect('/access/resetpwd/' + req.params.token);
    });
};

/**
 * Reset password POST from email token
 */
exports.reset = function (req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([

        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function (err, user) {
                if (!err && user) {
                    if (passwordDetails.confirmPassword === passwordDetails.password) {
                        user.password = passwordDetails.password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            if (err) {
                                return res.status(500).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                req.login(user, function (err) {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        // Remove sensitive data before return authenticated user
                                        user.password = undefined;
                                        user.salt = undefined;

                                        res.json(user);

                                        done(err, user);
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(500).send({
                            message: 'Passwords do not match'
                        });
                    }
                } else {
                    return res.status(500).send({
                        message: 'Password reset token is invalid or has expired.'
                    });
                }
            });
        },
        function (user, done) {
            res.render('modules/users/server/templates/reset-password-confirm-email', {
                name: user.displayName,
                appName: config.app.title
            }, function (err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            // var mailOptions = {
            //     to: user.email,
            //     from: config.mailer.from,
            //     subject: 'Your password has been changed',
            //     html: emailHTML
            // };
            let receivers = [user.email];
            smtpSender.sendHtml(receivers, 'Your password has been changed', emailHTML).then(function () {
                res.send({
                    message: 'An email has been sent to the provided email with further instructions.'
                });
                done();
            }, function (err) {
                logger.error(err);
                throw new CommonError('发送失败，请稍后再试');
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
    });
};

/**
 * Change Password
 */
exports.changePassword = function (req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    if (req.user) {
        if (passwordDetails.newPassword) {
            User.findById(req.user.id, function (err, user) {
                if (!err && user) {
                    if (user.authenticate(passwordDetails.currentPassword)) {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.password = passwordDetails.newPassword;

                            user.save(function (err) {
                                if (err) {
                                    return res.status(500).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                } else {
                                    req.login(user, function (err) {
                                        if (err) {
                                            res.status(500).send(err);
                                        } else {
                                            res.send({
                                                message: 'Password changed successfully'
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(500).send({
                                message: 'Passwords do not match'
                            });
                        }
                    } else {
                        res.status(500).send({
                            message: 'Current password is incorrect'
                        });
                    }
                } else {
                    res.status(500).send({
                        message: 'User is not found'
                    });
                }
            });
        } else {
            res.status(500).send({
                message: 'Please provide a new password'
            });
        }
    } else {
        res.status(500).send({
            message: 'User is not signed in'
        });
    }
};
