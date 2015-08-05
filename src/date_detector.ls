require! {
    moment
    ramda: r
    './misc': m
}

detectDate = (dateParser, input, reference, options={}) ->
    tokensThatContainDate = (tokens) ->
        makeForValidDate = createDate >> (.isValid())
        prefixesOfTokens = [r.take(x, tokens) for x in [1 to tokens.length]]
        prefixesThatContainDate = r.takeWhile makeForValidDate, prefixesOfTokens
        candidates = r.prepend [], prefixesThatContainDate
        r.last candidates

    createDate = m.join >> -> dateParser.future(it, reference, options)

    tokens = m.split(input)
    tokensWithDate = tokensThatContainDate(tokens)
    {
        date: createDate tokensWithDate
        tail: m.join r.drop(tokensWithDate.length, tokens)
    }

module.exports = {
    detectDate: r.curry detectDate
}

