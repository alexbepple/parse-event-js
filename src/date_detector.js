var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var detector = function (dateParser, input, reference) {
    var noOfTokensThatContainDate = function (tokens) {
        var now = moment();
        var takeX = function (_, idx, array) { return r.take(idx+1, array); };
        var makeForValidDate = function (tokens) {
            var aMoment = moment(createDateFromTokens(tokens));
            return aMoment.isValid();
        };
        var firstTokensThatContainDate = r.pipe(
            r.map.idx(takeX), r.takeWhile(makeForValidDate));
            return firstTokensThatContainDate(tokens).length;
    };

    var createDate = function (dateSpec) {
        return dateParser.future(dateSpec, reference).toDate();
    };
    var createDateFromTokens = r.pipe(m.join, createDate);

    var tokens = m.split(input);
    var noOfTokensForDate = noOfTokensThatContainDate(tokens);
	return {
		date: createDateFromTokens(r.take(noOfTokensForDate, tokens)),
		tail: m.join(r.skip(noOfTokensForDate, tokens))
	};
};

module.exports = {
    detector: r.curry(detector)
};

