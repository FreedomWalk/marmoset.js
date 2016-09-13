// lazyload config
(function () {
    'use strict';
    angular.module('angulr')
    /**
     * jQuery plugin config use ui-jq directive , config the js and css files that required
     * key: function name of the jQuery plugin
     * value: array of the css js file located
     */
        .constant('JQ_CONFIG', {
            easyPieChart: ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
            sparkline: ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
            plot: [
                'vendor/jquery/charts/flot/jquery.flot.min.js',
                'vendor/jquery/charts/flot/jquery.flot.resize.js',
                'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                'vendor/jquery/charts/flot/jquery.flot.spline.js',
                'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                'vendor/jquery/charts/flot/jquery.flot.pie.min.js'
            ],
            slimScroll: ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
            sortable: ['vendor/jquery/sortable/jquery.sortable.js'],
            nestable: [
                'vendor/jquery/nestable/jquery.nestable.js',
                'vendor/jquery/nestable/nestable.css'
            ],
            filestyle: ['vendor/jquery/file/bootstrap-filestyle.min.js'],
            slider: [
                'vendor/jquery/slider/bootstrap-slider.js',
                'vendor/jquery/slider/slider.css'
            ],
            chosen: [
                'vendor/jquery/chosen/chosen.jquery.min.js',
                'vendor/jquery/chosen/chosen.css'
            ],
            TouchSpin: [
                'vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'
            ],
            wysiwyg: [
                'vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                'vendor/jquery/wysiwyg/jquery.hotkeys.js'
            ],
            dataTable: [
                'vendor/jquery/datatables/jquery.dataTables.min.js',
                'vendor/jquery/datatables/dataTables.bootstrap.js',
                'vendor/jquery/datatables/dataTables.bootstrap.css'
            ],
            vectorMap: [
                'vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                'vendor/jquery/jvectormap/jquery-jvectormap.css'
            ],
            footable: [
                'vendor/jquery/footable/footable.all.min.js',
                'vendor/jquery/footable/footable.core.css'
            ]
        })
        // oclazyload config
        .config(config);

    config.$inject = ['$ocLazyLoadProvider'];

    function config($ocLazyLoadProvider) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [
                {
                    name: 'ngGrid',
                    files: [
                        'lib/angular-ui-grid/ui-grid.min.js',
                        'lib/angular-ui-grid/ui-grid.min.css'
                    ]
                },
                {
                    name: 'ui.select',
                    files: [
                        'lib/angular-ui-select/dist/select.min.js',
                        'lib/angular-ui-select/dist/select.min.css'
                    ]
                },
                {
                    name: 'angularFileUpload',
                    files: [
                        'lib/angular-file-upload/dist/angular-file-upload.min.js'
                    ]
                },
                {
                    name: 'ui.calendar',
                    files: [
                        'lib/angular-ui-calendar/src/calendar.js'
                    ]
                },
                {
                    name: 'ngImgCrop',
                    files: [
                        'lib/ng-img-crop/compile/minified/ng-img-crop.js',
                        'lib/ng-img-crop/compile/minified/ng-img-crop.css'
                    ]
                },
                {
                    name: 'angularBootstrapNavTree',
                    files: [
                        'lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        'lib/angular-bootstrap-nav-tree/dist/abn_tree.css'
                    ]
                },
                {
                    name: 'toastr',
                    files: [
                        'lib/angular-toastr/dist/angular-toastr.tpls.min.js',
                        'lib/angular-toastr/dist/angular-toastr.min.css'
                    ]
                },
                {
                    name: 'textAngular',
                    files: [
                        'lib/textAngular/dist/textAngular-sanitize.min.js',
                        'lib/textAngular/dist/textAngular.min.js'
                    ]
                },
                {
                    name: 'vr.directives.slider',
                    files: [
                        'lib/angular-slider/dist/slider.js',
                        'lib/angular-slider/dist/slider.css'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular',
                    files: [
                        'lib/videogular/videogular.min.js',
                        'lib/videogular-themes-default/videogular.min.css'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.controls',
                    files: [
                        'lib/videogular-controls/vg-controls.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.buffering',
                    files: [
                        'lib/videogular-buffering/vg-buffering.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.overlayplay',
                    files: [
                        'lib/videogular-overlay-play/vg-overlay-play.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.poster',
                    files: [
                        'lib/videogular-poster/vg-poster.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.imaads',
                    files: [
                        'lib/videogular-ima-ads/vg-ima-ads.min.js'
                    ]
                }
            ]
        });
    }
}());
