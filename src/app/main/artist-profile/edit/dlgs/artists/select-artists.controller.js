(function(){
    'use strict';

    angular
        .module('app.artist-profile')
        .controller('SelectArtistForAristProfileController', SelectArtistForAristProfileController);

    function SelectArtistForAristProfileController($scope, $rootScope, $mdDialog, SearchServices, msUtils, ProfileService, MusicianService){
      var vm = this;

      vm.selectedContacts = [];
      vm.listOrder = 'name';
      vm.listOrderAsc = false;
      vm.msScrollOptions = {
        suppressScrollX: true
      };

      vm.exists = msUtils.exists;
      vm.searchArtists = searchArtists;
      vm.toggleSelectContact = toggleSelectContact;
      vm.addArtistToSimilar = addArtistToSimilar;


      function searchArtists(text) {
        // console.log('search text',text);

        // $scope.search =text;
        if(text.length > 2){
          vm.showProgress = true;
          SearchServices.getArtistsSearch(text, 10).then(function (res) {
            vm.showProgress = false;
            $scope.$emit('searchAll', { message: text, search: res.data});
            vm.contacts = res.data;
            // $rootScope.search = res.data;
          });
        }
      }

      /**
       * Toggle selected status of the contact
       *
       * @param contact
       * @param event
       */
      function toggleSelectContact(contact, event)
      {
          if ( event )
          {
              event.stopPropagation();
          }

          if ( vm.selectedContacts.indexOf(contact) > -1 )
          {
              vm.selectedContacts.splice(vm.selectedContacts.indexOf(contact), 1);
          }
          else
          {
              vm.selectedContacts.push(contact);
          }
      }

      function addArtistToSimilar(){

        $rootScope.isShowLoader = true;

        MusicianService.addArtistToSimilar(vm.selectedContacts).then(function(res){
            console.log('add similar result', res.data);
            // $rootScope.$emit('addSimilar', {message: res.data});
            $mdDialog.hide(res.data);
            $rootScope.isShowLoader = false;
        });
      }
    }
})();
