require! {
    moment
    ramda:r
    './misc':m
}

endDetector = (detectDate, input, reference) ->
    skipFirstToken = r.pipe(m.split, r.skip(1), m.join)
    endMatch = detectDate(skipFirstToken(input), reference)
    if !endMatch.date.isValid() then endMatch.tail = input
    endMatch

module.exports = {
    detect-end: r.curry endDetector
}
