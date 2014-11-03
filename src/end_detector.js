var moment = require('moment');
var m = require('./misc');
var r = require('ramda');

var endDetector = function(detectDate) {
	return function(input) {
		var skipFirstToken = r.pipe(m.split, r.skip(1), m.join);
		var detectEnd = r.pipe(skipFirstToken, detectDate);
		var endMatch = detectEnd(input);
		if (!moment(endMatch.date).isValid()) endMatch.tail = input;
		return endMatch;
	};
};

module.exports = {
	detector: endDetector
};
