require! 'moment'

isMidnight = (moment) ->
    moment.isSame moment.clone().startOf 'day'

Event = (me) ->
    event = {
        title: me.title
        start: me.start
    }

    if me.end?.isValid()
        event.end = me.end.clone()
    else
        event.end = event.start.clone().add(me.durationInSeconds, 'seconds')

    event.isAllDay = isMidnight event.start and isMidnight event.end

    if event.isAllDay and me.durationInSeconds is 0
        event.end = event.end.add 1 \day

    return event


module.exports = Event

