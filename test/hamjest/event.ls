require! {
    hamjest
    './date'
    util
}

matchesEventDateTimeProperty = (getter, noun, verb, expected) ->
    matcher = date.equalsDateTime expected
    matches: (actual) ->
        matcher.matches getter(actual)
    describeTo: (description) ->
        description.append util.format 'event that %s ', verb
        matcher.describeTo description
    describeMismatch: (actual, description) ->
        description.append noun + ' '
        matcher.describeMismatch getter(actual), description
    getDiffItems: (actual) ->
        matcher.getDiffItems getter(actual)


module.exports = {
    allDay: -> hamjest.hasProperties {isAllDay: true}
    notAllDay: -> hamjest.hasProperties {isAllDay: false}
    starts: (expected) ->
        matchesEventDateTimeProperty (.start), 'start', 'starts', expected
    ends: (expected) ->
        matchesEventDateTimeProperty (.end), 'end', 'ends', expected
}
