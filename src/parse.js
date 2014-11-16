var r = require('ramda');
var moment = require('moment');
var m = require('./misc');

var juration = require('juration/juration');
var Event = require('./event');

var dateParser = require('./date_parser2');
var detectDate = require('./date_detector').detector(dateParser);
var detectEnd = require('./end_detector').detector(detectDate);


var noOfTokensThatContainDuration = function (tokens) {
	var doesThisNumberOfTokensContainDuration = r.range(0, tokens.length).map(function (n) {
		try {
			juration.parse(m.join(r.take(n+1, tokens)));
			return true;
		} catch (err) {
			return false;
		}
	});
	return doesThisNumberOfTokensContainDuration.lastIndexOf(true) + 1;
};

var durationInSeconds = function (tokens) {
    if (r.isEmpty(tokens)) return 0;
	return juration.parse(m.join(tokens));
};

var parse = function (input) {
	var startMatch = detectDate(input, moment());
	var endMatch = detectEnd(startMatch.tail, startMatch.date);

	var tokensAfterEnd = m.split(endMatch.tail);
	var noOfTokensForDuration = noOfTokensThatContainDuration(tokensAfterEnd);
	
    return Event({
        start: startMatch.date.toDate(),
        end:   endMatch.date.toDate(),
		durationInSeconds: durationInSeconds(r.take(noOfTokensForDuration, tokensAfterEnd)),
		isAllDay: !dateParser.specifiesTime(input),
        title: m.join(r.skip(noOfTokensForDuration, tokensAfterEnd))
    });
};

module.exports = {
    parse: parse
};

