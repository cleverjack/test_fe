(function ()
{
    'use strict';

    angular
        .module('app.artist-profile')
        .controller('ArtistShowProfileController', ArtistShowProfileController);

    /** @ngInject */
    function ArtistShowProfileController(artistDetail, $location, $localStorage, $rootScope, $scope, $state, $mdDialog, $document){
      var vm = this;

      if(artistDetail == undefined || artistDetail.artist == undefined){
        $location.url('/login');
      }

      vm.isEdit = false;

      if(artistDetail.user){
        vm.user = artistDetail.user[0];
      }
      vm.musician = artistDetail.artist ? artistDetail.artist : {};
      vm.payementDetails = artistDetail.payementDetails ? artistDetail.payementDetails : {};
      vm.planDetails = artistDetail.planDetails ? artistDetail.planDetails : {};
      if (vm.payementDetails.stipe_publishable_key) {
        Stripe.setPublishableKey(vm.payementDetails.stipe_publishable_key);
      }
      vm.showSubscriptionPopup = showSubscriptionPopup;

      function showSubscriptionPopup(ev) {
        $mdDialog.show({
          controller: SubscribePlanController,
          templateUrl: 'app/main/artist-profile/show/tabs/subscribe/subscribe.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(data) {
          //console.log(data);
        }, function() {
          console.log('Popup Cancelled/Closed!');
        });
      }
      function SubscribePlanController($scope, $mdDialog, UserServices) {
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
          UserServices.subscribeToArtist({token: paymentToken, type:'stripe', plan: $scope.planDetails.plan_id}).then(function(data){
            if (data.status) {
              $mdDialog.hide(data);
            }else{
              $scope.message = data.message;
            }
            $scope.subscribing = false;
          }, function(err){
            $scope.subscribing = false;
            $scope.message = err.statusText;
          });
        }
        $scope.subscribeWithPayPal = function(){
          $scope.subscribingWithPayPal = true;
          UserServices.subscribeToArtist({type:'paypal', plan: $scope.planDetails.plan_id}).then(function(data){
            if (data.status) {
              location.href=data.approvedLink;
              //$mdDialog.hide(data);
            }else{
              $scope.subscribingWithPayPal = false;
            }
            $scope.subscribing = false;
          }, function(err){
            $scope.subscribing = false;
            $scope.subscribingWithPayPal = false;
          });
        }
      }
    }
})();
