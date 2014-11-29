require! {
    chai: {expect}
    child_process: {exec}
    ramda: r
}

describe 'parseEvent binary' ->
    specify 'exits with error code 0', (done) ->
        parseEventBin = './node_modules/.bin/lsc src/parseEvent.ls ""'
        exec parseEventBin, (error) ->
            expect error .to.beNull()
            done()

