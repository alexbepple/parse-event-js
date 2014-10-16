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
        util.format("expected '%s' to be #{exp}", formatDate(date)),
        util.format("expected '%s' not to be #{exp}", formatDate(date))
    );
});

