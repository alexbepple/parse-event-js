var chai = require('chai');
chai.should();
global.expect = chai.expect;

chai.use(require('chai-shallow-deep-equal'));
chai.Assertion.addMethod('containDeep', function(tree) {
    new chai.Assertion(this._obj).to.shallowDeepEqual(tree);
});
