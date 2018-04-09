(function ()
{
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope,$mdSidenav, $state, userLibrary)
    {
        // Data

        //////////
       $scope.goTo = function(artist) {
         // console.log('artist',artist);
        $state.go('app.artistDetail',{'id':artist.id, 'name': artist.name.split(' ').join('+')});
      };

      $scope.goToArtistDetail = function (artist) {
        $mdSidenav('search-panel').close();
        if(artist.username){
          $state.go('app.artist-profile-show-by-username', {'username':artist.username});
        } else {
          $state.go('app.artist-profile-show',{'id':artist.id});
        }
	    };

      $scope.goToUserDetail = function (id) {
        $mdSidenav('search-panel').close();
        $state.go('app.listener-profile-show',{'id' : id});
	    };

      $scope.$on('searchAll', function (event, args) {
        $scope.search = args.search;
        $scope.text = args.message;
      });

      // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();
