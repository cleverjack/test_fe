(function ()
{
    'use strict';

    angular
        .module('app.toolbar', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider)
    {
    //    $translatePartialLoaderProvider.addPart('app/toolbar');
    }
})();
