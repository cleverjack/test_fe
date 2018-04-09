(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('myApp', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',


            // authentication
            'app.auth',

            // Profile
            'app.artist-profile',

            //landing
            'app.landing',

            'app.profile'

        ]);
})();
