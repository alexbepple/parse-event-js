var exec = require('child_process').exec;
var r = require('ramda');

describe('parseEvent binary', function () {
	it('exits with error code 0', function (done) {
		var parseEvent = '/usr/bin/env node src/parseEvent.js ""';

		var minimalEnv = r.pick(['PATH', 'PWD'])(process.env);

		exec(parseEvent, {env: minimalEnv}, function (error) {
			expect(error).to.beNull();
			done();
		});
	});
});
