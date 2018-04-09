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
            $state.go('app.profile');
        }else{
          $state.go('app.login');
        }
      }

    }
})();
