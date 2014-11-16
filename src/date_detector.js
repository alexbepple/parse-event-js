var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var detector = function (dateParser, input, reference) {
    var noOfTokensThatContainDate = function (tokens) {
        var takeX = function (_, idx, array) { return r.take(idx+1, array); };
        var makeForValidDate = r.pipe(createDateFromTokens, r.func('isValid'));
        var leadingTokensThatContainDate = r.pipe(
            r.map.idx(takeX), r.takeWhile(makeForValidDate));
        return leadingTokensThatContainDate(tokens).length;
    };

    var createDate = function (dateSpec) {
        return dateParser.future(dateSpec, reference);
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

