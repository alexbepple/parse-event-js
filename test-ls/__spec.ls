
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
