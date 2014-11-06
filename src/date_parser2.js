var moment = require('moment');
var r = require('ramda');

var future = function(dateSpec, reference) {
    var result;

    result = moment(dateSpec, 'H:mm');
    if (r.isEmpty(result.parsingFlags().unusedTokens)) return result;

    result = moment(dateSpec, 'D MMM');
    if (result.isValid() && !r.isEmpty(result.parsingFlags().unusedInput)) return moment.invalid();
    if (result.isValid()) return result;

    result = reference || moment();
    result.day(dateSpec);
    result.startOf('day');
    if (r.isEmpty(result.parsingFlags().unusedTokens)) return result;
};

module.exports = {
    future: future
};
