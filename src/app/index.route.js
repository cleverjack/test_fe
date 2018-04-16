(function ()
{
    'use strict';

    angular
        .module('myApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        /**
         * Layout Style Switcher
         *
         * This code is here for demonstration purposes.
         * If you don't need to switch between the layout
         * styles like in the demo, you can set one manually by
         * typing the template urls into the `State definitions`
         * area and remove this code
         */
        // Inject $cookies
        var $cookies;

        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);
        // Get active layout
        var oohyahLayoutStyle = $cookies.get('oohyahLayoutStyle') || 'verticalNavigation';
        
        var layouts = {
            verticalNavigation  : {
                main      : 'app/core/layouts/vertical-navigation.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation/navigation.html'
            },
            contentOnly         : {
                main      : 'app/core/layouts/content-only.html',
                toolbar   : '',
                navigation: '',
            }
        };
        // END - Layout Style Switcher

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {

                    'main@'         : {
                        templateUrl: layouts[oohyahLayoutStyle].main,
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: layouts[oohyahLayoutStyle].toolbar,
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: layouts[oohyahLayoutStyle].navigation,
                        controller : 'NavigationController as vm'
                    }

                }
            });

    }

})();
