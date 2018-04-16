(function ()
{
    'use strict';

    angular
        .module('myApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock(apiUrl, $http, $rootScope, $state,$timeout, $localStorage, utils, $location,$log)
    {

        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams)
        {
            $rootScope.isOpenMenu = false;
            $rootScope.loadingProgress = true;
            $rootScope.stage = 0;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams)
        {
          // Activate loading indicator
          $timeout(function ()
          {
            $rootScope.loadingProgress = false;
          });

        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // if (window.location.protocol !== "https:") window.location.protocol = "https:";

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();
