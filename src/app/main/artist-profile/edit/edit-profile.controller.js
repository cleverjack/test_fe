(function() {
  'use strict';

  angular
    .module('app.artist-profile')
    .controller('ArtistEditProfileController', ArtistEditProfileController);

  /** @ngInject */
  function ArtistEditProfileController(musician, Employees, countries, $localStorage, $mdDialog, $rootScope, $scope, $state, $mdSidenav, utils, appCons, ProfileService, MusicianService, $timeout) {

    var vm = this;

    vm.isEdit = false;
    vm.user = $localStorage.session.user;

    if (vm.user.username && vm.user.username != " ") {
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
    //vm.form.paymentaddress = vm.musician.payment_address;
    vm.servicePlans = [
      {
        plan_id: 1,
        amount: 5,
        plan_name: '<span>Local</span><br><span>Artist</span>',
        description: '<div class="term">Artist Sets Subscription Price </div><div class="term">Oohyah Offers Same Price </div>',
        fans: 5,
        stripe_key: 'sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ',
        stripe_id: 'plan_CfnSLNyxwPjUYY',
        is_selected: false
      },
      {
        plan_id: 2,
        amount: 5,
        plan_name: '<span>Independent</span><br><span>Artist</span>',
        description: '<div class="term">Artist Sets Subscription Price </div><div class="term">Oohyah Offers Same Price </div>',
        fans: 10,
        stripe_key: 'sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ',
        stripe_id: 'plan_CfnSLNyxwPjUYY',
        is_selected: true
      },
      {
        plan_id: 3,
        amount: 2,
        plan_name: '<span>Major Label</span><br><span>Artist</span>',
        description: '<div class="term">Artist Sets Subscription Price </div><div class="term">Oohyah Offers Same Price </div>',
        fans: 500,
        stripe_key: 'sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ',
        stripe_id: 'plan_CfnSLNyxwPjUYY',
        is_selected: false
      },
      {
        plan_id: 4,
        amount: 0.5,
        plan_name: '<span>Super Star</span><br><span>Artist</span>',
        description: '<div class="term super-term">6% Service Fee</div>',
        fans: 500,
        stripe_key: 'sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ',
        stripe_id: 'plan_CfnSLNyxwPjUYY',
        is_selected: false
      }
    ]
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
      MusicianService.saveMusician(data).then(function(res) {
        $rootScope.isShowLoader = false;
        if (res.message.id == 2040) {
          utils.notify(utils.trans('Successfully Updated'), 'success');
          vm.musician = res.data[1];
        } else {
          utils.notify(utils.trans('Failed'), 'error');
        }
      });
    }

    function saveArtistInfo(form) {
      var data = new FormData();
      data.append('name', form.firstname + ' ' + form.lastname);
      data.append('location', form.location);
      data.append('gender', form.gender);
      data.append('website', form.website);
      data.append('paymentaddress', form.paymentaddress);
      data.append('artist_id', vm.musician.id);
      $rootScope.isShowLoader = false;
      MusicianService.saveMusician(data).then(function(res) {
        $rootScope.isShowLoader = false;
        if (res.message.id == 2040) {
          utils.notify(utils.trans('Successfully Updated'), 'success');
          vm.musician = res.data[1];
        } else {
          utils.notify(utils.trans('Failed'), 'error');
        }
      });
    }
    vm.hasPaymentInfo = false;
    vm.paymentDetailsUpdating = false;
    vm.saveArtistpayment = saveArtistpayment;
    
    vm.paymentInfoErrorMessage = null;
    vm.paymentInfoSuccessMessage = null;
    
    function saveArtistpayment(form) {
      vm.paymentInfoErrorMessage = null;
      vm.paymentInfoSuccessMessage = null;
      vm.paymentDetailsUpdating = true;
      
      MusicianService.saveMusicianPaymentInfo(form).then(function(data) {
        vm.paymentDetailsUpdating = false;
        vm.hasPaymentInfo = (vm.form.paypal_api_password && vm.form.paypal_client_id && vm.form.paypal_client_secret && vm.form.paypal_sign && vm.form.paypal_username && vm.form.stipe_publishable_key && vm.form.stripe_key);
        vm.user.paypal_email = form.paypal_email;
        $localStorage.session.user = vm.user;
        if (data.status) {
          vm.paymentInfoErrorMessage = null;
          vm.paymentInfoSuccessMessage = data.message;
        }else{
          vm.paymentInfoSuccessMessage = null;
          vm.paymentInfoErrorMessage = data.message;
        }
        $timeout(function(){
          vm.paymentInfoSuccessMessage = null;
          vm.paymentInfoErrorMessage = null;
        }, 5000);
      }, function(err){
        vm.paymentInfoErrorMessage = err.body;
        vm.paymentInfoSuccessMessage = null;
        $timeout(function(){
          vm.paymentInfoSuccessMessage = null;
          vm.paymentInfoErrorMessage = null;
        }, 5000);
      });
    }

    vm.getArtistpayment = getArtistpayment;

    function getArtistpayment() {
      MusicianService.getArtistpayment().then(function(data) {
        vm.form = data.data ? data.data : {};
        if (vm.user.paypal_email) {
          vm.form.paypal_email = vm.user.paypal_email; 
        }

        vm.hasPaymentInfo = (vm.form.paypal_api_password && vm.form.paypal_client_id && vm.form.paypal_client_secret && vm.form.paypal_sign && vm.form.paypal_username && vm.form.stipe_publishable_key && vm.form.stripe_key);
      });
    }
    
    vm.getArtistpayment();
    vm.getArtistPlans = getArtistPlans;
    vm.plans = [];
    function getArtistPlans() {
      MusicianService.getArtistPlans().then(function(data) {
        if (data.status && data.code==200) {
          vm.plans = data.data;
        }else{
          vm.plans = [];
        }
      });
    }
    vm.getArtistPlans();
    Stripe.setPublishableKey('pk_test_bVvaPSi39gMYihZgqd7tdFn2');
    /*Create plan Popup and controller start*/
    $scope.showAddPlanForm = function(ev) {
      $mdDialog.show({
          controller: AddPlanController,
          templateUrl: 'app/main/artist-profile/edit/tabs/your-plans/create-plan/create-plan.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(data) {
        }, function() {
        });
    };
    function AddPlanController($scope, $mdDialog, MusicianService) {
      $scope.planDetails = {};
      $scope.planErrors = {};
      $scope.creatingPlan = false;
      $scope.hide = function() {
        $scope.planDetails = {};
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $scope.planDetails = {};
        $mdDialog.cancel();
      };

      $scope.savePlan = function() {
        $scope.creatingPlan = true;
        MusicianService.addPlanDetails($scope.planDetails).then(function(data){
          if (!data.status && data.code==400) {
            $scope.planErrors = data.errors;
            $scope.creatingPlan = false;
            return;
          }
          if (data.status && data.code==200) {
            $mdDialog.hide(data);
          }
          $scope.creatingPlan = false;
        });
      };
    }
    /*Create plan Popup and controller End*/
    vm.planSelected = function(plan, ev) {
        vm.planDetails = plan;
        $mdDialog.show({
          controller: SubscribePlanController,
          templateUrl: 'app/main/artist-profile/show/tabs/subscribe/subscribe.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(data) {
        }, function() {
          console.log('Popup Cancelled/Closed!');
        });
      }
      function SubscribePlanController($scope, $mdDialog, MusicianService, $timeout) {
        $scope.planDetails = vm.planDetails;
        $scope.subscriptionError = {};
        $scope.cardDetails = {};
        $scope.subscribing = false;
        $scope.message = null;
        $scope.subscribingWithPayPal = false;
        $scope.hide = function() {
          $scope.planDetails = {};
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $scope.planDetails = {};
          $mdDialog.cancel();
        };

        $scope.subscribeToPlan = function(){
          $scope.message = null;
          if (!$scope.cardDetails.expire_date || !$scope.cardDetails.card_number || !$scope.cardDetails.cvv) {
            $scope.message = 'Invalid details provided.';
            return;
          }
          $scope.subscribing = true;
          var expire = $scope.cardDetails.expire_date.split('/');
          var cardData = {};
          cardData.exp_month = (expire[0]) ? expire[0] : null;
          cardData.exp_year = (expire[1]) ? expire[1] : null;
          cardData.number = $scope.cardDetails.card_number;
          cardData.cvv = $scope.cardDetails.cvv;
          var _that = $scope;
          Stripe.card.createToken(cardData, function(status, response){
            if (status==200) {
              _that.paymentToken = response.id;
              _that.message = null;
              _that.createSubscription(_that.paymentToken);
              _that.$apply();
            }else{
              _that.message = response.error.message;
              _that.subscribing = false;
              _that.$apply();

            }
          });
        }
        $scope.createSubscription = function(paymentToken){
          $scope.planDetails.token = paymentToken;
          $scope.planDetails.type = 'stripe';
          $scope.planDetails.plan_description = angular.copy($scope.planDetails.description);
          $scope.planDetails.plan = angular.copy($scope.planDetails.plan_id);
          MusicianService.subscribeToWeb($scope.planDetails).then(function(data){
            if (data.status) {
              utils.notify(utils.trans(data.message), 'success');
              $mdDialog.hide(data);
            }else{
              utils.notify(utils.trans(data.message), 'error');
              $scope.message = data.message;
            }
            $scope.subscribing = false;
          }, function(err){
            $scope.subscribing = false;
            $scope.message = err.statusText;
            utils.notify(utils.trans($scope.message), 'error');
          });
        }
        $scope.subscribeWithPayPal = function(){
          if (!vm.form.paypal_email) {
            $scope.message = 'You need to set your PayPal email before subscribing using PayPal.';
            $timeout(function() {
              $scope.message = null;
            }, 5000);
            return;
          }
          $scope.subscribingWithPayPal = true;
          $scope.planDetails.type = 'paypal';
          $scope.planDetails.plan_description = angular.copy($scope.planDetails.description);
          $scope.planDetails.plan = angular.copy($scope.planDetails.plan_id);
          $scope.planDetails.paypal_id = 'P-9FY90293J8245432HX4WBB4A';
          MusicianService.subscribeToWeb($scope.planDetails).then(function(data){
            if (data.status) {
              location.href=data.approvedLink;
            }else{
              $scope.message = data.message;
              $scope.subscribingWithPayPal = false;
            }
          }, function(err){
            $scope.subscribing = false;
            $scope.message = data.message;
            $scope.subscribingWithPayPal = false;
          });
        }
      }
  }
})();
