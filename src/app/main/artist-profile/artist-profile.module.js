(function ()
{
    'use strict';

    angular
        .module('app.artist-profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        $stateProvider
        .state('app.artist-profile-edit', {
          url      : '/artist/profile',
          views    : {
              'content@app': {
                  templateUrl: 'app/main/artist-profile/edit/edit-profile.html',
                  controller : 'ArtistEditProfileController as vm'
              }
          },
          resolve: {
            musician : function(MusicianService, $localStorage, $state, $location)
            {
                if($localStorage.session && $localStorage.session.user){
                    return MusicianService.getMusician().then(function(res){
                    // console.log('resolve',data);
                      if(res.message.description == "Token Expired."){
                        delete $localStorage.session;
                        $location.url('/');
                      } else {
                          return res.data;
                      }
                    });
                } else {
                  $location.url('/login');
                }
            },
            countries: function (msApi){
              return msApi.resolve('todo.countries@get');
            },
            Employees: function (msApi)
            {
              return msApi.resolve('tables.employees100@get');
            }
          },
          bodyClass: 'profile'
        })
        .state('app.artist-profile-show', {
          url      : '/artist/:id',
          views    : {
              'content@app': {
                  templateUrl: 'app/main/artist-profile/show/show-profile.html',
                  controller : 'ArtistShowProfileController as vm'
              }
          },
          resolve: {
            artistDetail : function (ProfileService, $localStorage, $state, $location, $stateParams)
            {
                if($localStorage.session && $localStorage.session.user){
                    return ProfileService.getArtistDetail($stateParams.id).then(function(res){
                      if(res){
                        if(res.message.description == "Token Expired."){
                          delete $localStorage.session;
                          $location.url('/login');
                        }else{
                          return res.data;
                        }
                      } else {
                        $location.url('/login');
                      }
                    });
                } else {
                  $state.go('app.landing');
                }
            }
          },
          bodyClass: 'profile'
        })

        msApiProvider.register('todo.countries', ['app/data/countries/countries.json']);
        msApiProvider.register('tables.employees100', ['app/data/tables/employees100.json']);
    }

})();
