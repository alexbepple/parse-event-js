var moment = require('moment');
var r = require('ramda');
var m = require('./misc');
var dateParser = require('./date_parser');

var noOfTokensThatContainDate = function (tokens) {
    var now = moment();
    var takeX = function (_, idx, array) { return r.take(idx+1, array); };
    var makeForValidDate = function (tokens) {
        var aMoment = moment(createDateFromTokens(tokens));
        return aMoment.isValid() && aMoment.isAfter(now);
    };
    var noOfTokensThatContainDate = r.pipe(
        r.map.idx(takeX), r.findLastIndex(makeForValidDate), r.add(1));
    return noOfTokensThatContainDate(tokens);
};

var createDate = function (dateSpec) {
	return dateParser.future(dateSpec);
};
var createDateFromTokens = r.pipe(m.join, createDate);

var detectDate = function (input) {
    var tokens = m.split(input);
    var noOfTokensForDate = noOfTokensThatContainDate(tokens);
	return {
		date: createDateFromTokens(r.take(noOfTokensForDate, tokens)),
		tail: m.join(r.skip(noOfTokensForDate, tokens))
	};
};

module.exports = {
	detect: detectDate
};
