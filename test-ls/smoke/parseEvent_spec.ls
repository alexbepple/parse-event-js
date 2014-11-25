require! {
    chai: {expect}
    child_process: {exec}
    ramda: r
}

describe 'parseEvent binary' ->
    specify 'exits with error code 0', (done) ->
        parseEventBin = '/usr/bin/env node src/parseEvent.js ""'
        minimalEnv = r.pick(['PATH', 'PWD'])(process.env)
        exec parseEventBin, {env: minimalEnv}, (error) ->
            expect(error).to.beNull()
            done()

