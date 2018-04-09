(function ()
{
    'use strict';

    angular
        .module('app.artist-profile')
        .controller('ArtistShowProfileController', ArtistShowProfileController);

    /** @ngInject */
    function ArtistShowProfileController(artistDetail, $location, $localStorage, $rootScope, $scope, $state, $mdDialog, $document)
    {
      var vm = this;

      if(artistDetail == undefined){
        $location.url('/login');
      }

      vm.isEdit = false;

      if(artistDetail.user){
        vm.user = artistDetail.user[0];
      }
      vm.musician = artistDetail;
    }

})();
