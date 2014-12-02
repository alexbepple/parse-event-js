require! hamjest

expect = (actual) -> {
    to: (matcher) ->
        hamjest.assertThat actual, matcher
}

module.exports = {
    expect
    equal: hamjest.equalTo
    haveProperties: hamjest.hasProperties
    contain: hamjest.hasProperties
}
