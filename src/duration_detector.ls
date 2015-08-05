require! {
    ramda:r
    './misc':m
    'juration/juration': juration
}

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

detectDuration = (input) ->
    tokens = m.split(input)
    noOfTokensForDuration = noOfTokensThatContainDuration(tokens)
    {
        durationInSeconds: durationInSeconds(r.take(noOfTokensForDuration, tokens))
        tail: m.join(r.drop(noOfTokensForDuration, tokens))
    }

module.exports = {
    detectDuration
}
