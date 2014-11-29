require! {
    chai: {expect}
    child_process: {exec}
    ramda: r
}

describe 'parseEvent binary' ->
    specify 'exits with error code 0', (done) ->
        parseEventBin = './node_modules/.bin/lsc src/parseEvent.ls ""'
        minimalEnv = process.env |> r.pick ['PATH']
        exec parseEventBin, {env: minimalEnv}, (error) ->
            expect error .to.beNull()
            done()

