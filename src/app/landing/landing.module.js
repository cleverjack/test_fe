(function ()
{
    'use strict';

    angular
        .module('app.landing', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.landing', {
            url      : '/',
            views    : {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.landing': {
                    templateUrl: 'app/landing/landing.html',
                    controller : 'LandingController as vm'
                }
            },
            bodyClass: 'landing'
        });
    }

})();
