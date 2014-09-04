require('sugar');
var util = require('util');

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
    return parameters.join(' ');
};

exports = Object.merge(exports, {
    formatForAddEvent: formatForAddEvent
});

