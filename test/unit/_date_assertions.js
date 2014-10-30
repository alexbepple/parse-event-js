var Assertion = require('chai').Assertion;

var formatDate = function (date) {
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

Assertion.addMethod('future', function() {
    var date = this._obj;
    this.assert(
        date.isFuture(),
        'expected #{act} to be in the future',
        'expected #{act} not to be in the future',
        null,
        formatDate(date)
    );
});

Assertion.addMethod('valid', function() {
    var date = this._obj;
    this.assert(
        date.isValid(),
        'expected #{act} to be valid',
        'expected #{act} not to be valid',
        null,
        formatDate(date)
    );
});

Assertion.addMethod('date', function(dateOrDateAsString) {
    var date = this._obj;
    this.assert(
        date.is(dateOrDateAsString),
        'expected #{act} to be #{exp}',
        'expected #{act} not to be #{exp}',
        formatDate(Date.create(dateOrDateAsString)),
        formatDate(date)
    );
});

