require('sugar');
var util = require('util');
var m = require('./misc');

var formatDate = function (date) {
    if (!date) return '';
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

var formatForAddEvent = function (event) {
    var parameters = [
        util.format("-start '%s'", formatDate(event.start)),
        util.format("-end '%s'", formatDate(event.end)),
        '-allDay', event.isAllDay,
        util.format("-title '%s'", event.title)
    ];
    return m.join(parameters);
};

module.exports = {
    formatForAddEvent: formatForAddEvent
};

