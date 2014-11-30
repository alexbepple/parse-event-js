require! {
    moment
    ramda: r
    './misc': m
}

detect-date = (dateParser, input, reference) ->
    noOfTokensThatContainDate = (tokens) ->
        takeX = (_, idx, array) -> r.take(idx+1, array)
        makeForValidDate = r.pipe(createDateFromTokens, r.func('isValid'))
        leadingTokensThatContainDate = r.pipe(
            r.map.idx(takeX), r.takeWhile(makeForValidDate))
        leadingTokensThatContainDate(tokens).length

    createDate = (dateSpec) -> dateParser.future(dateSpec, reference)
    createDateFromTokens = r.pipe(m.join, createDate)

    tokens = m.split(input)
    noOfTokensForDate = noOfTokensThatContainDate(tokens)
    {
        date: createDateFromTokens r.take(noOfTokensForDate, tokens)
        tail: m.join(r.skip(noOfTokensForDate, tokens))
    }

module.exports = {
    detect-date: r.curry detect-date
}

