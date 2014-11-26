chai = require('chai')
chai.should()
global.expect = chai.expect

Assertion = chai.Assertion;

chai.use require('chai-shallow-deep-equal')
chai.use (_, utils) ->
	Assertion.overwriteProperty 'contain', (_super) ->
		(contained) ->
			if utils.flag(this, 'deep')
				return @shallowDeepEqual
			_super.call this

Assertion.addMethod 'beFalse', ->
	@false

Assertion.addMethod 'beTrue', ->
	@true

Assertion.addMethod 'beUndefined', ->
	@undefined

Assertion.addMethod 'beNull', ->
	@null
