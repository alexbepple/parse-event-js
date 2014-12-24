require! {
    ramda: r
}

module.exports = {
    split: r.split(' ') >> r.flip(r.difference) ['']
    join: r.join ' '
}
