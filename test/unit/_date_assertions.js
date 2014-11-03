var moment = require('moment');
var Assertion = require('chai').Assertion;

var formatMoment = function (moment) {
    return moment.format('YYYY-MM-DD HH:mm');
};


Assertion.addMethod('future', function() {
    var myMoment = moment(this._obj);
    this.assert(
        myMoment.isAfter(moment()),
        'expected #{act} to be in the future',
        'expected #{act} not to be in the future',
        null,
        formatMoment(myMoment)
    );
});

Assertion.addMethod('valid', function() {
    var myMoment = moment(this._obj);
    this.assert(
        myMoment.isValid(),
        'expected #{act} to be valid',
        'expected #{act} not to be valid',
        null,
        formatMoment(myMoment)
    );
});

Assertion.addMethod('date', function(dateOrDateAsString) {
    var actualMoment = moment(this._obj);
    var expectedMoment = moment(dateOrDateAsString);
    this.assert(
        actualMoment.isSame(expectedMoment),
        'expected #{act} to be #{exp}',
        'expected #{act} not to be #{exp}',
        formatMoment(expectedMoment),
        formatMoment(actualMoment)
    );
});

