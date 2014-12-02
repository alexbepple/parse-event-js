
format = (moment) ->
    moment.format 'YYYY-MM-DD'

equalsDate = (expected) ->
    matches: (actual) ->
        expected.isSame actual, 'day'
    describeTo: (description) ->
        description.appendValue format expected
    describeMismatch: (actual, description) ->
        description
            .append 'was '
            .appendValue format actual

module.exports = {
    equalsDate
}
