(function(){
    'use strict';

    angular
        .module('app.artist-profile')
        .controller('LockDialogController', LockDialogController);

    // function LockDialogController(id, album, musician, UserServices, $mdDialog, $document, $window, $state){
	function LockDialogController(id, UserServices, $mdDialog, $window, $state){
        var vm = this;
        vm.follow = follow;
        vm.goback = goback;

        function follow(ev){
          $mdDialog.cancel();return;
          if(id){
            UserServices.followUser(id).then(function(res){
              $state.go('app.albumDetail',{id:album.id, artistName:vm.musician.name, albumName:album.name});
              $mdDialog.cancel();
				angular.element($document.find('#artist-show-profile')).ready(function (ev) {
					$mdDialog.show({
						templateUrl        : 'app/main/artist-profile/show/success-dlg/success-dlg.html',
						controller         : 'SuccessDialogController',
						controllerAs       : 'vm',
						locals             : {
							id : vm.user ? vm.user.id : null
						},
						parent             : angular.element($document.find('#content-container')),
						targetEvent        : ev,
						clickOutsideToClose: false,
						escapeToClose      : true,
					});
				});
            })
          } else {
              $state.go('app.albumDetail',{id:album.id, artistName:musician.name, albumName:album.name});
              $mdDialog.cancel();
              angular.element($document.find('#artist-show-profile')).ready(function (ev) {
                  $mdDialog.show({
                      templateUrl        : 'app/main/artist-profile/show/success-dlg/success-dlg.html',
                      controller         : 'SuccessDialogController',
                      controllerAs       : 'vm',
                      locals             : {
                          id : vm.user ? vm.user.id : null
                      },
                      parent             : angular.element($document.find('#content-container')),
                      targetEvent        : ev,
                      clickOutsideToClose: false,
                      escapeToClose      : true,
                  });
              });
          }
        }

        function goback() {
			$mdDialog.cancel();
			$window.history.back();
		}
    }
})();
