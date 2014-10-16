
var Event = function(me) {
    if (!(me.end && me.end.isValid())) {
        me.end = me.start.clone().addSeconds(me.durationInSeconds);
    }
    return me;
};

module.exports = Event;
