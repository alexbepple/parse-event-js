var moment = require('moment');
var m = require('./misc');
var r = require('ramda');

var endDetector = function(detectDate, input, reference) {
    var skipFirstToken = r.pipe(m.split, r.skip(1), m.join);
    var endMatch = detectDate(skipFirstToken(input), reference);
    if (!moment(endMatch.date).isValid()) endMatch.tail = input;
    return endMatch;
};

module.exports = {
	detector: r.curry(endDetector)
};
