
var Event = function(me) {
    if (!me.end) {
        me.end = me.start.addSeconds(me.durationInSeconds);
    }
    return me;
};

module.exports = Event;
