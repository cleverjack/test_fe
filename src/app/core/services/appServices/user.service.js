(function ()
{
    'use strict';

    angular
        .module('app.core')
        .service('UserServices', UserServices);

    /** @ngInject */
    function UserServices(apiUrl, $http, $localStorage)
    {

       this.updateProfile = updateProfile;
       this.updateUserProfile = updateUserProfile;
       this.changePassword = changePassword;
       this.changeAvatar = changeAvatar;
       this.getUserProfile = getUserProfile;
       this.followUser = followUser;
       this.unfollowUser = unfollowUser;
       this.saveAvatar = saveAvatar;

       function updateProfile(data) {
         // console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().updateProfile,
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            },
            data: data
          };

          return $http(req).then(function(res){
            // console.log('res',res);
            return res
          });
      }

        function updateUserProfile(data) {
            // console.log('data',data);
            var req = {
                method: 'POST',
                url: apiUrl().updateUserProfile,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: $localStorage.session.user.token
                },
                data: data
            };

            return $http(req).then(function(res){
                // console.log('res',res);
                return res.data;
            });
        }

       function changePassword(data) {
         // console.log('data',data,apiUrl().changePassword);
          var req = {
            method: 'POST',
            url: apiUrl().changePassword,
            headers: {
              'Content-Type': 'application/json',
              Authorization: $localStorage.session.user.token
            },
            data: data
          };

          return $http(req).then(function(res){
            // console.log('res',res);
            return res
          });
      }
       function changeAvatar(data) {
         // console.log('data',data);
          var req = {
            method: 'POST',
            url: apiUrl().changeAvatar,
            headers: {
              'Content-Type': undefined,
              Authorization: $localStorage.session.user.token
            },
            data: data
          };

          return $http(req).then(function(res){
            // console.log('res',res);
            return res
          });
      }

      function saveAvatar(data){
        var req = {
          method: 'POST',
          url: apiUrl().saveAvatar,
          headers: {
            'Content-Type': undefined,
            Authorization: $localStorage.session.user.token
          },
          data: data
        };

        return $http(req).then(function(res){
          // console.log('res',res);
          return res.data
        });
      }

      function getUserProfile() {
        var req = {
          method: 'POST',
          url: apiUrl().getUserProfile,
          headers: {
            'Content-Type': 'application/json',
            Authorization: $localStorage.session.user.token
          }
        };

        return $http(req).then(function(res){
          // console.log('res',res);
          return res.data
        });
      }

      function followUser(id){
        var req = {
          method: 'POST',
          url : apiUrl().admin_users + '/' + id + '/follow',
          headers : {
            'Content-Type' : 'application/json',
            Authorization: $localStorage.session.user.token
          }
        };

        return $http(req).then(function(res){
          console.log('Follow', res.data);
          return res.data;
        });
      }

      function unfollowUser(id){
        var req = {
          method: 'POST',
          url: apiUrl().admin_users + '/' + id + '/unfollow',
          headers: {
            'Content-Type': 'application/json',
            Authorization: $localStorage.session.user.token
          }
        };

        return $http(req).then(function(res){
          console.log('Unfollow', res.data);
          return res.data;
        });
      }

    }
})();
