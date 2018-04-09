(function () {
	'use strict';

	angular
	.module('app.toolbar')
	.controller('ToolbarController', ToolbarController);

	/** @ngInject */
	function ToolbarController($scope, $q, $state, $location, $timeout, $rootScope, $mdSidenav, $mdDialog, $localStorage, AuthServices) {
		var vm = this;

		vm.isAdmin = false;
    vm.isModerator = false;
    vm.isPublicPage = false;

    vm.bodyEl = angular.element(document).find('body');

		if ($localStorage.session && $localStorage.session.user) {
      vm.user = $localStorage.session.user;

      if ($localStorage.session.user.first_name && $localStorage.session.user.first_name != "") {
				// console.log(vm.user);
				vm.title = $localStorage.session.user.first_name;
			} else {
				if ($localStorage.session.user.email) {
					vm.title = $localStorage.session.user.email.split('@')[0]
				}
      }

		}
		// Methods
		vm.toggleSidenav = toggleSidenav;
		vm.logout = logout;
		//////////

		/**
		 * Toggle sidenav
		 *
		 * @param sidenavId
		 */
		function toggleSidenav(sidenavId) {
			$mdSidenav(sidenavId).toggle();
		}

		/**
		 * Logout Function
		 */
		function logout() {

			var data = {
				token: $localStorage.session.user.token
			};
			// Do logout here..
			AuthServices.logout(data).then(function (res) {
				$localStorage.session = null;
				$state.go('app.landing');
			})

		}

		vm.toggleAnimation = function () {
			vm.animationsEnabled = !vm.animationsEnabled;
		};

	}
})();
