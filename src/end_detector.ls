require! {
    moment
    ramda: {skip, pipe}
    './misc': {split, join}
}

detectEnd = (detectDate, input, reference) -->
    omitFirstToken = pipe split, skip(1), join
    endMatch = detectDate omitFirstToken(input), reference, findTimeFirst:true
    if !endMatch.date.isValid() then endMatch.tail = input
    endMatch

module.exports = {
    detectEnd
}
