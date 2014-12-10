require! 'moment'

Event = (me) ->
    if not me.end.isValid()
        me.end = me.start.clone().add(me.durationInSeconds, 'seconds')
    if me.isAllDay and me.durationInSeconds is 0
        me.end = me.end.add 1 \day
    me

module.exports = Event

