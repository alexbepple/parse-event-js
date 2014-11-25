require! {
    chai: {expect}
    child_process: {exec}
    ramda: r
}

describe 'parseEvent binary' ->
    specify 'exits with error code 0', (done) ->
        parseEventBin = '/usr/bin/env node src/parseEvent.js ""'
        minimalEnv = process.env |> r.pick ['PATH']
        exec parseEventBin, {env: minimalEnv}, (error) ->
            expect error .to.beNull()
            done()

