'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
    client: {
        lib: {
            css: [
                // bower:css
                'public/lib/bootstrap/dist/css/bootstrap.min.css',
                //'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/animate.css/animate.min.css',
                'public/lib/font-awesome/css/font-awesome.min.css',
                'public/lib/simple-line-icons/css/simple-line-icons.css',
                'public/lib/SourceSansPro/SourceSansPro.css'
                // endbower
            ],
            js: [
                // bower:js
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-mocks/angular-mocks.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
                'public/lib/ngstorage/ngStorage.js',

                //'public/vendor/angular//angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/oclazyload/dist/ocLazyLoad.js',
                'public/lib/angular-translate/angular-translate.js',
                'public/lib/moment/min/moment-with-locales.min.js',
                'public/vendor/libs/loader-static-files.js',
                'public/vendor/libs/storage-cookie.js',
                'public/vendor/libs/storage-local.js',
                'public/lib/crypto-js/crypto-js.js'
                //'public/lib/crypto-js/aes.js'
                // endbower
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/css/*.css', '!modules/angulr/client/css/app.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js'
        ],
        img: [
            'modules/**/*/img/**/*.jpg',
            'modules/**/*/img/**/*.png',
            'modules/**/*/img/**/*.gif',
            'modules/**/*/img/**/*.svg'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js'],
        moveAngulrLibs: ['angulrLibs/**']
    },
    server: {
        gruntConfig: ['gruntfile.js'],
        gulpConfig: ['gulpfile.js'],
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        schedules: 'modules/*/server/schedules/*.js',
        sockets: 'modules/*/server/sockets/**/*.js',
        config: ['modules/*/server/config/*.js'],
        policies: 'modules/*/server/policies/*.js',
        views: ['modules/*/server/views/*.html'],
        receivers: 'modules/mq/server/receivers/*.js'
    }
};
