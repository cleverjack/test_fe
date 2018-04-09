(function ()
{
    'use strict';

    angular
        .module('myApp')
        .factory('myHttpInterceptor', myHttpInterceptor);

    /** @ngInject */
    function myHttpInterceptor($rootScope, $q, $location, $localStorage)
    {
      return {
        // optional method
        'request': function(config) {
          // do something on success
          // console.log('request',config.url);
          return config;
        },

        // optional method
        'requestError': function(rejection) {
          // do something on error
          // console.log('requestError',rejection);
          if (canRecover(rejection)) {
            // console.log('in if rejection',rejection);
            return responseOrNewPromise
          }
          return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
          // do something on success
          if(response.data.message && response.data.message.id== 2040){

          }

          if(response.data.message && response.data.message.id== 5030){
            delete $localStorage.session;
            $rootScope.isShowLoader = false;
            $location.url('/login');
          }
          return response;
        },

        // optional method
        'responseError': function(rejection) {

        }
      };
    }

})();
