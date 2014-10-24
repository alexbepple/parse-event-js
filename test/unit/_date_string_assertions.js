var Assertion = require('chai').Assertion;
var x = require('date_detector');

Assertion.addMethod('containMonth', function() {
    this.assert(
        x.containsMonth(this._obj),
        'expected #{act} to contain month',
        'expected #{act} not to contain month'
    );
});

