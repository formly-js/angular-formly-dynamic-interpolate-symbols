/*global
beforeEach:false,
describe:false,
expect:false,
inject:false,
it:false
*/

describe('angular-formly-dynamic-interpolate-symbols service', function() {
  var symbolService, interpolate;

  beforeEach(module('formlyDynamicInterpolateSymbols'));
  beforeEach(module(function($provide) {
    $provide.value('$interpolate', {
      start: '{{',
      end: '}}',
      startSymbol: function(val) {
        if (val) {
          this.start = val;
          return this;
        }
        return this.start;
      },
      endSymbol: function(val) {
        if (val) {
          this.end = val;
          return this;
        }
        return this.end;
      }
    });
  }));

  beforeEach(inject(function($interpolate, _formlyDynamicInterpolateSymbolsService_) {
    interpolate = $interpolate;
    symbolService = _formlyDynamicInterpolateSymbolsService_;
  }));

  it('should replace start symbol', function() {
    var template = '<div>{{val}}</div>';
    interpolate.startSymbol('[[');
    expect(symbolService.updateSymbols(template)).toBe('<div>[[val}}</div>');
  });
  it('should replace end symbol', function() {
    var template = '<div>{{val}}</div>';
    interpolate.endSymbol(']]');
    expect(symbolService.updateSymbols(template)).toBe('<div>{{val]]</div>');
  });
});
