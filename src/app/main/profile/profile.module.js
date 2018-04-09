(function ()
{
    'use strict';

    angular
        .module('app.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        $stateProvider.state('app.profile', {
            url      : '/listener/profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
                PhotosVideos: function (msApi)
                {
                    return msApi.resolve('profile.photosVideos@get');
                },
                selfData: function(ProfileService, $localStorage, $location){
                  if($localStorage.session && $localStorage.session.user){
                    return ProfileService.getListenerSelfData().then(function(res){
                      return res.data;
                    });
                  } else {
                    $location.url('/login');
                  }
                },
                artists: function(ProfileService, $localStorage, $location){
                  if($localStorage.session && $localStorage.session.user){
                    return ProfileService.getArtists().then(function(res){
                      return res.data;
                    });
                  } else {
                    $location.url('/login');
                  }
                }
            },
            bodyClass: 'profile'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/profile');

        // Api
        msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);
        msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

    }

})();
