var Assertion = require('chai').Assertion;
var q = require('parse');

Assertion.addMethod('containMonth', function() {
    this.assert(
        q.containsMonth(this._obj),
        'expected #{act} to contain month',
        'expected #{act} not to contain month',
        null,
        this._obj
    );
});

