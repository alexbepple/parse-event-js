require! 'moment'

Event = (me) ->
    if !(me.end && moment(me.end).isValid())
        me.end = moment(me.start).clone().add(me.durationInSeconds, 'seconds').toDate()
    if me.isAllDay
        me.end = moment(me.end).add 1 \day .toDate()
    result = {
        start: moment me.start
        end: moment me.end
        isAllDay: me.isAllDay
        title: me.title
    }
    result

module.exports = Event

