(function (app) {
    'use strict';

    app.registerModule('files', ['core']);
    app.registerModule('files.services');
    app.registerModule('files.routes', ['ui.router', 'core.routes', 'files.services']);
}(ApplicationConfiguration));
