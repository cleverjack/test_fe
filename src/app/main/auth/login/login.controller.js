(function ()
{
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(utils, apiUrl, $http, $log, $state, $rootScope, $localStorage, $stateParams, AuthServices)
    {
      //Data
      var vm = this;
      //Methods
      vm.login = login;

      function login(user){
          $rootScope.isShowLoader = true;
          AuthServices.login(user).then(function (res) {
            // console.log('res',res)
            if(res.data.success){
                $localStorage.session = {
                  user: null
                };

                $localStorage.session['user'] = res.data.data;
                // $window.location.reload();
                if(res.data.data.permission == 'listener'){
                  $state.go('app.profile');
                } else if(res.data.data.permission == 'artist'){
                  $state.go('app.artist-profile-edit');
                } else {
                  $state.go('app.landing');
                }

            } else {
                vm.errorMessage = res.data.message.description;

            }
            $rootScope.isShowLoader = false;
          });
      }
    }
})();
