(function ()
{
    'use strict';

    angular
        .module('myApp')
        .config(config);

    /** @ngInject */
    function config($translateProvider, $httpProvider,$mdAriaProvider)
    {
        // Put your common app configurations here
      $httpProvider.interceptors.push('myHttpInterceptor');
        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        // Globally disables all ARIA warnings.
        $mdAriaProvider.disableWarnings();
      }

})();
