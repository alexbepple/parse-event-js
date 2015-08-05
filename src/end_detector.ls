require! {
    moment
    ramda: {drop, pipe}
    './misc': {split, join}
}

detectEnd = (detectDate, input, reference) -->
    omitFirstToken = pipe split, drop(1), join
    endMatch = detectDate omitFirstToken(input), reference, findTimeFirst:true
    if !endMatch.date.isValid() then endMatch.tail = input
    endMatch

module.exports = {
    detectEnd
}
