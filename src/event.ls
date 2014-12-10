require! 'moment'

Event = (me) ->
    event = {
        title: me.title
        start: me.start
        isAllDay: me.isAllDay
    }

    if me.end.isValid()
        event.end = me.end.clone()
    else
        event.end = event.start.clone().add(me.durationInSeconds, 'seconds')

    if event.isAllDay and me.durationInSeconds is 0
        event.end = event.end.add 1 \day
    event

module.exports = Event

