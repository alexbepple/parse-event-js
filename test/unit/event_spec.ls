require! {
    moment
    event: Event
}

describe 'Event' ->
    start = moment()
    startClone = start.clone()

    specify 'remembers its start' ->
        Event {start: start} .should.start startClone

    specify 'disregards an invalid end' ->
        Event {
            start: start
            end: moment.invalid()
        } .should.end startClone


describe 'Event with start date and duration' ->
    event = Event {
        start: moment('2014-01-01 01:01')
        durationInSeconds: 60
    }

    specify 'knows when it ends' ->
        expect event .to.end '2014-01-01 01:02'

    specify 'preserves its start date' ->
        expect event .to.start '2014-01-01 01:01'


describe 'All-day event' ->
    specify 'ends a day later' ->
        expect Event {
            start: moment('2014-01-01 00:00')
            isAllDay: true
        } .to.end '2014-01-02 00:00'

