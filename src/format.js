require('sugar');
var util = require('util');

var formatDate = function (date) {
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

var formatForAddEvent = function (event) {
    return util.format(
        "-start '%s' -allDay %s -durationInSeconds %d -title '%s'", 
        formatDate(event.start), 
        event.isAllDay, 
        event.durationInSeconds, 
        event.title);
};

exports = Object.merge(exports, {
    formatForAddEvent: formatForAddEvent
});

