var Assertion = require('chai').Assertion;
var util = require('util');

var formatDate = function (date) {
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

Assertion.addMethod('future', function() {
    var date = this._obj;
    this.assert(
        date.isFuture(),
        util.format("expected '%s' to be in the future", formatDate(date)),
        util.format("expected '%s' not to be in the future", formatDate(date))
    );
});

Assertion.addMethod('date', function(dateAsString) {
    var date = this._obj;
    this.assert(
        date.is(dateAsString),
        'expected #{act} to be #{exp}',
        'expected #{act} not to be #{exp}',
        dateAsString,
        formatDate(date)
    );
});

