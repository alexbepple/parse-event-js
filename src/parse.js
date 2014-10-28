require('sugar');
var _ = require('underscore');
var juration = require('juration/juration');
var Event = require('./event');
var dateDetector = require('./date_detector');

var split = function (input) { return input.split(' '); };
var join = function (array) { return array.join(' '); };

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
			juration.parse(join(tokens.first(n)));
			return true;
		} catch (err) {
			return false;
		}
	});
	return doesThisNumberOfTokensContainDuration.lastIndexOf(true) + 1;
};

var durationInSeconds = function (tokens) {
	if (tokens.isEmpty()) return 0;
	return juration.parse(join(tokens));
};

var parse = function (input) {
	var startMatch = dateDetector.detect(input);
	var tokensAfterStart = split(startMatch.tail);

	var endMatch = dateDetector.detect(join(tokensAfterStart.from(1)));
	if (!endMatch.date.isValid()) endMatch.tail = startMatch.tail;
	var tokensAfterEnd = split(endMatch.tail);

	var noOfTokensForDuration = noOfTokensThatContainDuration(tokensAfterEnd);
	
    return Event({
        start: startMatch.date,
        end:   endMatch.date,
		durationInSeconds: durationInSeconds(tokensAfterEnd.first(noOfTokensForDuration)),
		isAllDay: !containsTime(input),
        title: join(tokensAfterEnd.from(noOfTokensForDuration))
    });
};

module.exports = {
    parse: _.compose(parse, disambiguateTimes)
};

