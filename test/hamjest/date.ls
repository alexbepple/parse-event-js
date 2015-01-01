require! moment

formatUsing = (formatString) ->
    (aMoment) -> moment(aMoment).format formatString

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
        getDiffItems: (actual) -> {
            expected: format expected
            actual: format actual
        }

equalsCalendarDate = equalsMoment \day, formatUsing 'YYYY-MM-DD'

equalsDateTime = equalsMoment null, formatUsing 'YYYY-MM-DD HH:mm:ss'

module.exports = {
    equalsCalendarDate
    equalsDateTime
}
