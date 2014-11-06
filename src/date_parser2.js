var moment = require('moment');
var r = require('ramda');

var allWeekdays = r.concat(moment.weekdays(), moment.weekdaysShort());
var allWeekdaysInLowerCase = r.map(r.func('toLowerCase'))(allWeekdays);
var isWeekday = function(dateSpec) {
    return r.contains(dateSpec.toLowerCase())(allWeekdaysInLowerCase);
};

var hasUnusedInput = function(moment) {
    return !r.isEmpty(moment.parsingFlags().unusedInput);
};
var hasUnusedParsingTokens = function(moment) {
    return !r.isEmpty(moment.parsingFlags().unusedTokens);
};

var future = function(dateSpec, reference) {
    var result;

    result = moment(dateSpec, 'H:mm');
    if (!hasUnusedParsingTokens(result) && !hasUnusedInput(result)) return result;

    result = moment(dateSpec, 'D MMM');
    if (result.isValid() && !hasUnusedInput(result)) return result;

    if (isWeekday(dateSpec)) {
        result = reference || moment();
        result.day(dateSpec);
        result.startOf('day');
        if (!hasUnusedParsingTokens(result)) return result;
    }

    return moment.invalid();
};

module.exports = {
    future: future
};
