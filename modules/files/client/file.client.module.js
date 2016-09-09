(function (app) {
    'use strict';

    app.registerModule('files', ['core']);
    app.registerModule('files.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
