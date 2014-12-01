require! 'moment'

Event = (me) ->
    if !(me.end && moment(me.end).isValid())
        me.end = moment(me.start).clone().add(me.durationInSeconds, 'seconds').toDate()
    if me.isAllDay
        me.end = moment(me.end).add 1 \day .toDate()
    me

module.exports = Event

