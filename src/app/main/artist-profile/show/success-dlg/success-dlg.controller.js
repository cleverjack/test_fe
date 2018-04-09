(function(){
	'use strict';

	angular
	.module('app.artist-profile')
	.controller('SuccessDialogController', SuccessDialogController);

	function SuccessDialogController($localStorage, $rootScope, $scope, id, UserServices, $mdDialog){
		var vm = this;
		vm.follow = follow;
		vm.goback = goback;

		function follow(){
			if(id){
				UserServices.followArtist(id).then(function(res){
					console.log('Follow', res.data);
					$mdDialog.cancel();
				})
			} else {
				$mdDialog.cancel();
			}
		}

		function goback() {
			$mdDialog.cancel();
		}
	}
})();
