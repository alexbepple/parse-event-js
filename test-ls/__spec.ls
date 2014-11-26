
describe 'beNull' ->
	specify 'succeeds on null' ->
		expect null .to.beNull()
	specify 'fails on an object' ->
		expect {} .not.to.beNull()

describe 'beTrue' ->
	specify 'succeeds on true' ->
		expect true .to.beTrue()
	specify 'fails otherwise' ->
		expect false .not.to.beTrue()

describe 'beFalse' ->
	specify 'succeeds on false' ->
		expect false .to.beFalse()
	specify 'fails otherwise' ->
		expect true .not.to.beFalse()

describe 'beUndefined' ->
	specify 'succeeds on undefined' ->
		expect undefined .to.beUndefined()
	specify 'fails otherwise' ->
		expect null .not.to.beUndefined()

describe 'containDeep' ->
	specify 'succeeds if actual contains all of expected' ->
		expect {a: {a: 1}, b: 2} .to.containDeep {a: {a: 1}}
	specify 'fails otherwise' ->
		expect {} .not.to.containDeep {a: 1}
