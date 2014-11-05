var moment = require('moment');
var Assertion = require('chai').Assertion;

var formatDate = function (dateSpec) {
    if (dateSpec === undefined) return dateSpec;
    return moment(dateSpec).format('YYYY-MM-DD HH:mm');
};


Assertion.addMethod('future', function() {
    var actual = this._obj;
    this.assert(
        moment(actual).isAfter(moment()),
        'expected #{act} to be in the future',
        'expected #{act} not to be in the future',
        null,
        formatDate(actual)
    );
});

Assertion.addMethod('valid', function() {
    var actual = this._obj;
    var myMoment = moment(this._obj);
    this.assert(
        moment(actual).isValid(),
        'expected #{act} to be valid',
        'expected #{act} not to be valid',
        null,
        formatDate(actual)
    );
});

Assertion.addMethod('date', function(dateOrDateAsString) {
    var actual = this._obj;
    this.assert(
        moment(actual).isSame(moment(dateOrDateAsString)),
        'expected #{act} to be #{exp}',
        'expected #{act} not to be #{exp}',
        formatDate(dateOrDateAsString),
        formatDate(actual)
    );
});

module.exports = {
    formatDate: formatDate
};
