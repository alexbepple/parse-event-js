require('sugar');
var _ = require('underscore');
var m = require('./misc');

var juration = require('juration/juration');
var Event = require('./event');
var detectStart = require('./date_detector').detect;
var detectEnd = require('./end_detector').detector(detectStart);

var containsTime = function (input) {
	return (/\d{1,2}:\d{2}/).test(input);
};
var disambiguateTimes = function (input) {
	// this is a duplication of logic in date_detector
    return input.replace(/(\d{1,2})(\d{2})/, '$1:$2');
};

var noOfTokensThatContainDuration = function (tokens) {
	var doesThisNumberOfTokensContainDuration = (1).upto(tokens.length).map(function (n) {
		try {
			juration.parse(m.join(tokens.first(n)));
			return true;
		} catch (err) {
			return false;
		}
	});
	return doesThisNumberOfTokensContainDuration.lastIndexOf(true) + 1;
};

var durationInSeconds = function (tokens) {
	if (tokens.isEmpty()) return 0;
	return juration.parse(m.join(tokens));
};

var parse = function (input) {
	var startMatch = detectStart(input);
	var endMatch = detectEnd(startMatch.tail);

	var tokensAfterEnd = m.split(endMatch.tail);
	var noOfTokensForDuration = noOfTokensThatContainDuration(tokensAfterEnd);
	
    return Event({
        start: startMatch.date,
        end:   endMatch.date,
		durationInSeconds: durationInSeconds(tokensAfterEnd.first(noOfTokensForDuration)),
		isAllDay: !containsTime(input),
        title: m.join(tokensAfterEnd.from(noOfTokensForDuration))
    });
};

module.exports = {
    parse: _.compose(parse, disambiguateTimes)
};

