(function ()
{
    'use strict';

    angular
        .module('app.core')
        .filter('removeExtension', removeExtension);

    /** @ngInject */
    function removeExtension()
    {
        return function (value)
        {
          if(value && value.indexOf('.') !== -1){
            var strs = value.split('.');
            if(strs.length && (strs[1] == "mp3" || strs[1] == "wav"))
              return strs[0];
          }
          return value;
        };
    }

})();
