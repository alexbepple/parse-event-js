require! hamjest

expect = (actual) -> {
    to: (matcher) ->
        hamjest.assertThat actual, matcher
}

module.exports = {
    expect
    haveProperties: hamjest.hasProperties
    contain: hamjest.hasProperties
}
