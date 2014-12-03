require! hamjest

expect = (actual) ->
    to = (matcher) ->
        hamjest.assertThat actual, matcher
    to.not = (matcher) ->
        hamjest.assertThat actual, hamjest.not matcher
    { to }

module.exports = {
    expect
    equal: hamjest.equalTo
    haveSize: hamjest.hasSize

    haveProperties: hamjest.hasProperties
    contain: hamjest.hasProperties

    containString: hamjest.containsString
}
