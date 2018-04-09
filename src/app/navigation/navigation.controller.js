(function ()
{
  'use strict';

  angular
      .module('app.navigation')
      .controller('NavigationController', NavigationController);

  /** @ngInject */
  function NavigationController(apiUrl, $localStorage, $http, $scope, $rootScope, $mdDialog, $state, $mdToast, $mdSidenav, utils, $timeout, $location)
  {
    var vm = this;
    vm.showProgress = false;
    vm.collapsed = true;
    vm.menulistCollapsed = true;
    vm.navigation = [];
    vm.playlist = [];

    $scope.$watch('vm.collapsed', function(newVal){
      if(newVal == true){
        // $location.hash('nav-top');
      }
    });

    $scope.state =  $state.current.name;
    // Data
    vm.bodyEl = angular.element(document).find('body');
    $scope.weight = 0;
    vm.folded = false;
    vm.msScrollOptions = {
      suppressScrollX: true
    };

    // Methods
    vm.toggleMsNavigationFolded = toggleMsNavigationFolded;

    //////////

    vm.navigation = [
      {
        "group": true,
        "title": "DEMO",
        "uisref": "",
        "weight": 1,
        "children": []
      }

    ];

    /**
     * Toggle folded status
     */
    function toggleMsNavigationFolded()
    {
      vm.folded = !vm.folded;
    }


    // Close the mobile menu on $stateChangeSuccess
    $scope.$on('$stateChangeSuccess', function ()
    {
      // console.log($stateParams);
      vm.bodyEl.removeClass('ms-navigation-horizontal-mobile-menu-active');
    });
    vm.isStateActive = function (stateName) {
      if($state.current.name == stateName){
        return true;
      }
    };
  }
})();
