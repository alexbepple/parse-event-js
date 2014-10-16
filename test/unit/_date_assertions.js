var Assertion = require('chai').Assertion;
var util = require('util');

var formatDate = function (date) {
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

Assertion.addMethod('future', function() {
    var date = this._obj;
    this.assert(
        date.isFuture(),
        'expected #{act} to be in the future',
        'expected #{act} to not be in the future',
        null,
        date.short()
    );
});

Assertion.addMethod('date', function(dateAsString) {
    var date = this._obj;
    this.assert(
        date.is(dateAsString),
        util.format("expected '%s' to be #{exp}", formatDate(date)),
        util.format("expected '%s' not to be #{exp}", formatDate(date)),
        dateAsString,
        date
    );
});

