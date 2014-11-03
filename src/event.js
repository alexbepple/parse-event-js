var moment = require('moment');

var Event = function(me) {
    if (!(me.end && moment(me.end).isValid())) {
        me.end = moment(me.start).clone().add(me.durationInSeconds, 'seconds').toDate();
    }
    return me;
};

module.exports = Event;
