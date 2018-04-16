(function ()
{
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    /** @ngInject */
    function LandingController(utils, $state, $rootScope, $window, $localStorage, $http, AuthServices, $scope, $location, $mdDialog,$document)
    {
      var vm = this;
      vm.goToSignInPage = goToSignInPage;

      $rootScope.isShowLoader = false;

      function goToSignInPage(ev){
        if($localStorage.session && $localStorage.session.user){
          if($localStorage.session.user.roles){
            var roles = $localStorage.session.user.roles;
            var isArtist = (roles && roles[0] && roles[0].name == 'artist') ? true : false;
            if (isArtist) {
              $state.go('app.artist-profile-edit');
            }else{
              $state.go('app.profile');   
            }
          }else{
           $state.go('app.profile');
          }
        }else{
          $state.go('app.login');
        }
      }
    }
})();
