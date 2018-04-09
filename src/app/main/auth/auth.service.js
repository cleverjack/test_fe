(function ()
{
    'use strict';

    angular
        .module('app.auth')
        .service('AuthServices', AuthServices);

    /** @ngInject */
    function AuthServices(apiUrl, $http, $localStorage)
    {

       this.login = login;
       this.loginWithGoogle = loginWithGoogle;
       this.loginWithFacebook = loginWithFacebook;
       this.register = register;
       this.forgetPassword = forgetPassword;
       this.logout = logout;
       this.authorization = authorization;
       this.resetpassword = resetpassword;
      // $http.defaults.headers = { 'Content-Type' : 'application/json' }
      // $http.defaults.headers.put = { 'Content-Type' : 'application/json' }
       function login(data) {

         //console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().login,
            data: data,
            headers: {
              'Content-Type': 'application/json'
            }
          };

          return $http(req).then(function(res){
            console.log('auth service test',res.data.data);
            return res;
          })
      }


      function loginWithGoogle(){
        var req = {
          method: 'GET',
          url: apiUrl().auth + '/social/google',
          headers: {
            'Content-Type' : 'application/json'
          }
        };

        return $http(req).then(function(res){
          console.log('auth social', res.data);
        })
      }

      function loginWithFacebook(){
        var req = {
          method: 'GET',
          url: apiUrl().auth + '/social/facebook',
          headers: {
            'Content-Type' : 'application/json'
          }
        };

        return $http(req).then(function(res){
          console.log('auth social', res.data);
        })
      }

       function register(data) {
         //console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().register,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          return $http(req).then(function(res){
            //console.log('res',res);
            return res
          });
      }
       function forgetPassword(data) {
         //console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().forget_password,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          return $http(req).then(function(res){
            //console.log('res',res.data);
            return res
          });
      }

      function resetpassword(data) {
        var req = {
          method: 'POST',
          url: apiUrl().reset_password,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        return $http(req).then(function(res){
          //console.log('res',res.data);
          return res
        });
      }
       function logout(data) {
         //console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().logout,
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            },
            data: data
          };

          return $http(req).then(function(res){
            //console.log('res',res.data);
            return res
          });
      }

      function authorization(){
        var req = {
          method: 'POST',
          url: apiUrl().musician + '/authorization',
          headers: {
            'Content-Type': 'application/json',
            Authorization: $localStorage.session.user.token
          }
        };

        return $http(req).then(function(res){
          console.log('verfyForMusician', res.data);
          return res.data;
        })
      }

    }
})();
