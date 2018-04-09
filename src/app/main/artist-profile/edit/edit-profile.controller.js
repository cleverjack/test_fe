(function ()
{
  'use strict';

  angular
      .module('app.artist-profile')
      .controller('ArtistEditProfileController', ArtistEditProfileController);

  /** @ngInject */
  function ArtistEditProfileController(musician, Employees, countries, $localStorage, $mdDialog, $rootScope, $scope, $state, $mdSidenav, utils, appCons, ProfileService, MusicianService)
  {

    var vm = this;

    vm.isEdit = false;
    vm.user = $localStorage.session.user;

    if(vm.user.username && vm.user.username != " "){
      vm.name = vm.user.username;
    } else {
      vm.name = '';
    }

    vm.musician = musician;

    vm.countries = countries.data;

    vm.form = {};

    vm.generalForm = {};
    vm.generalForm.name = vm.musician.name;
    vm.generalForm.username = vm.musician.username;
    vm.generalForm.location = vm.musician.location;
    vm.generalForm.gender = vm.musician.gender;
    vm.generalForm.website = vm.musician.website;
    vm.generalForm.twitter = vm.musician.twitter;
    vm.generalForm.facebook = vm.musician.facebook;
    vm.generalForm.instagram = vm.musician.instagram;
    vm.form.paymentaddress = vm.musician.payment_address;

    if (vm.form.paymentaddress == '' || vm.form.paymentaddress == 'undefined' || vm.form.paymentaddress == null) vm.paymentconnected = false;
    else vm.paymentconnected = true;

    vm.saveArtistInfo = saveArtistInfo;
    vm.employees = Employees.data;

    vm.saveGeneralInfo = saveGeneralInfo;

    function saveGeneralInfo() {
      vm.generalForm.artist_id = vm.musician.id;
      var data = new FormData();
      data.append('name', vm.generalForm.name);
      data.append('username', vm.generalForm.username);
      data.append('email', vm.generalForm.email);
      data.append('location', vm.generalForm.location);
      data.append('gender', vm.generalForm.gender);
      data.append('website', vm.generalForm.website);
      data.append('twitter', vm.generalForm.twitter);
      data.append('facebook', vm.generalForm.facebook);
      data.append('instagram', vm.generalForm.instagram);
      data.append('artist_id', vm.musician.id);
      $rootScope.isShowLoader = true;
      MusicianService.saveMusician(data).then(function(res){
        $rootScope.isShowLoader = false;
        if(res.message.id == 2040){
          utils.notify(utils.trans('Successfully Updated'), 'success');
          vm.musician = res.data[1];
        } else {
          utils.notify(utils.trans('Failed'), 'error');
        }
      });
    }

		function saveArtistInfo(form){
			var data = new FormData();
			data.append('name', form.firstname + ' ' + form.lastname);
			data.append('location', form.location);
			data.append('gender', form.gender);
			data.append('website', form.website);
			data.append('paymentaddress', form.paymentaddress);
			data.append('artist_id', vm.musician.id);
			$rootScope.isShowLoader = false;
			MusicianService.saveMusician(data).then(function(res){
				$rootScope.isShowLoader = false;
				if(res.message.id == 2040){
					utils.notify(utils.trans('Successfully Updated'), 'success');
					vm.musician = res.data[1];
				} else {
					utils.notify(utils.trans('Failed'), 'error');
				}
			});
		}
  }
})();
