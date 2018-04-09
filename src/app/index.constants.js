(function ()
{
    'use strict';

    angular
        .module('myApp')
        .constant('apiUrl',apiUrl)
        .constant('appCons', appCons);

        /** @ngInject */
        function apiUrl(){
          var baseUrl = "http://localhost/";//"https://api.oohyah.com/";//
          return {
            'baseUrl': baseUrl,
            'login' : baseUrl + 'loginUser',
            'logout' : baseUrl + 'logOut',
            'musician' : baseUrl + 'musician',
            'profile' : baseUrl + 'profile'
          }
        }

        function appCons(){
          return {
            'MAX_UPLOAD_SIZE' : 20
          };
        }
})();
