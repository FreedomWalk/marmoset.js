/**
 * Created by jiangyun on 16/8/2.
 */
(function (app) {
    'use strict';

    app.registerModule('pets', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
    app.registerModule('pets.services');
    app.registerModule('pets.routes', ['ui.router', 'core.routes', 'pets.services']);
}(ApplicationConfiguration));
