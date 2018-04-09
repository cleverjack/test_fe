(function ()
{
    'use strict';

    angular
        .module('app.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State

        $stateProvider.state('app.login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            resolve: {
                user: function ($localStorage, $location) {
                  if($localStorage.session && $localStorage.session.user){
                    // console.log('resolve');
                      $location.url('/listener/profile');
                  } else {
                     return {}
                  }
                }
            },
            bodyClass: 'login'
        });
    }

})();
