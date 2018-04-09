(function ()
{
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(Timeline, About, PhotosVideos, selfData, artists)
    {
        var vm = this;

        // Data
        vm.posts = Timeline.posts;
        vm.activities = Timeline.activities;
        vm.about = About.data;
        vm.photosVideos = PhotosVideos.data;
        vm.user = selfData;
        vm.artists = artists;

        // Methods

        //////////
    }

})();
