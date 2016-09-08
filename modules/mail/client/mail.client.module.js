/**
 * Created by bournewang on 16/9/8.
 */
(function (app) {
    'use strict';

    app.registerModule('mails', ['core']);
    app.registerModule('mails.services');
    app.registerModule('mails.routes', ['ui.router', 'core.routes', 'mails.services']);
}(ApplicationConfiguration));
