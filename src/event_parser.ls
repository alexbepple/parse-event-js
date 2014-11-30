require! {
    moment
    ramda:r
    './misc':m
}

juration = require('juration/juration')
Event = require('./event')

dateParser = require('./date_parser2')
detectDate = require('./date_detector').detect-date dateParser
detectEnd = require('./end_detector').detect-end detectDate


noOfTokensThatContainDuration = (tokens) ->
    doesThisNumberOfTokensContainDuration = r.range(0, tokens.length).map (n) ->
        try
            juration.parse(m.join(r.take(n+1, tokens)))
            return true
        catch
            # pass

    doesThisNumberOfTokensContainDuration.lastIndexOf(true) + 1

durationInSeconds = (tokens) ->
    if (r.isEmpty(tokens)) then return 0
    juration.parse(m.join(tokens))

parseEvent = (input) ->
    startMatch = detectDate(input, moment())
    endMatch = detectEnd(startMatch.tail, startMatch.date)

    tokensAfterEnd = m.split(endMatch.tail)
    noOfTokensForDuration = noOfTokensThatContainDuration(tokensAfterEnd)

    Event {
        start: startMatch.date.toDate()
        end:   endMatch.date.toDate()
        durationInSeconds: durationInSeconds(r.take(noOfTokensForDuration, tokensAfterEnd))
        isAllDay: !dateParser.specifiesTime(input)
        title: m.join(r.skip(noOfTokensForDuration, tokensAfterEnd))
    }

module.exports = {
    parseEvent
}

