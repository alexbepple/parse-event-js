require! hamjest

expect = (actual) -> {
    to: (matcher) ->
        hamjest.assertThat actual, matcher
}

module.exports = {
    expect
    contain: hamjest.hasProperties
    equal: hamjest.equalTo
    haveSize: hamjest.hasSize
    haveProperties: hamjest.hasProperties
}
