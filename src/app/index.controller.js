(function ()
{
    'use strict';

    angular
        .module('myApp')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController($rootScope, apiUrl, fuseTheming, $scope, $http, $localStorage, utils, $location)
    {
      var vm = this;
      $rootScope.isShowLoader = false;
      // Data
      vm.themes = fuseTheming.themes;
    }
})();
