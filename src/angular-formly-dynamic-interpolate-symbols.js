(function() {
  angular.module('formlyDynamicInterpolateSymbols', ['formly'])
    .service('formlyDynamicInterpolateSymbolsService',
      ['$interpolate', function($interpolate) {
        this.updateSymbols = function updateSymbols(template) {
          var start = $interpolate.startSymbol();
          var end = $interpolate.endSymbol();
          if (start !== '{{') {
            template = template.replace(/{{/g, start);
          }
          if (end !== '}}') {
            template = template.replace(/}}/g, end);
          }
          return template;
        };
      }])
    .run(['formlyConfig', 'formlyDynamicInterpolateSymbolsService',
      function(formlyConfig, formlyDynamicInterpolateSymbolsService) {
        formlyConfig.templateManipulators.postWrapper.push(formlyDynamicInterpolateSymbolsService.updateSymbols);
      }]);
})();
