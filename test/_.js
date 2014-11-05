var chai = require('chai');
chai.should();
global.expect = chai.expect;

var Assertion = chai.Assertion;

chai.use(require('chai-shallow-deep-equal'));
Assertion.addMethod('containDeep', function(tree) {
    new Assertion(this._obj).to.shallowDeepEqual(tree);
});
Assertion.addMethod('falsy', function() {
	new Assertion(this._obj).to.be.false;
});
Assertion.addMethod('beUndefined', function() {
	new Assertion(this._obj).to.be.undefined;
});
