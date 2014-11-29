require! 'moment'

Event = (me) ->
    if !(me.end && moment(me.end).isValid())
        me.end = moment(me.start).clone().add(me.durationInSeconds, 'seconds').toDate()
    me

module.exports = Event

