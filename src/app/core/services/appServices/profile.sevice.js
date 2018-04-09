(function(){
    'use strict';

    angular
        .module('app.core')
        .service('ProfileService', ProfileService);

    function ProfileService(apiUrl, $http, $localStorage){

        this.getArtistDetail = getArtistDetail;
        this.getListenerSelfData = getListenerSelfData;
        this.getListenerData = getListenerData;
        this.getArtists = getArtists;

        function getArtists(){
          var req = {
            method: 'GET',
            url: apiUrl().profile + '/artists',
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            }
          };

          return $http(req).then(function(res){
            // console.log('Artist Detail', res.data);
            return res.data;
          });
        }

        function getArtistDetail(id){
          var req = {
            method: 'GET',
            url: apiUrl().profile + '/get-artist-detail/' + id,
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            }
          };

          return $http(req).then(function(res){
            // console.log('Artist Detail', res.data);
            return res.data;
          });
        }

        function getListenerSelfData(){
          var req = {
            method: 'GET',
            url: apiUrl().profile + '/get-listener-selfdata',
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            }
          };

          return $http(req).then(function(res){
            console.log('Listener', res.data);
            return res.data;
          })
        }

      function getListenerData(id){
        var req = {
          method: 'GET',
          url: apiUrl().profile + '/get-listener-profile/' + id,
          headers: {
            'Content-Type': 'application/json',
            Authorization: $localStorage.session.user.token
          }
        };

        return $http(req).then(function(res){
          console.log('Listener Profile Data', res.data);
          return res.data;
        })
      }
    }
})();
