/**
 * Created by jiangyun on 16/8/2.
 */
(function (app) {
    'use strict';

    app.registerModule('angulr', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
    app.registerModule('ui.load');
    app.registerModule('ui.jq');
}(ApplicationConfiguration));
