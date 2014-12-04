require! moment

formatCalendarDate = (moment) ->
    moment.format 'YYYY-MM-DD'

equalsMoment = (precision, format) ->
    (expected) ->
        matches: (actual) ->
            moment(expected).isSame actual, precision
        describeTo: (description) ->
            description
                .appendValue format expected
        describeMismatch: (actual, description) ->
            description
                .append 'was '
                .appendValue format actual

equalsCalendarDate = equalsMoment \day, formatCalendarDate

equalsDateTime = equalsMoment null, (-> it)


module.exports = {
    equalsCalendarDate
    equalsDateTime
}
