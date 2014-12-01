require! {
    moment
    './duration_detector': {detectDuration}
    './event': Event
    './date_parser2': dateParser
}

detectDate = require('./date_detector').detectDate dateParser
detectEnd = require('./end_detector').detectEnd detectDate

parseEvent = (input) ->
    startMatch = detectDate input, moment()
    endMatch = detectEnd startMatch.tail, startMatch.date
    durationMatch = detectDuration endMatch.tail

    Event {
        start: startMatch.date.toDate()
        end:   endMatch.date.toDate()
        durationInSeconds: durationMatch.durationInSeconds
        isAllDay: !dateParser.specifiesTime(input)
        title: durationMatch.tail
    }

module.exports = {
    parseEvent
}

