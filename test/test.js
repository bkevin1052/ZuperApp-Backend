var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


  describe('#find()', function() {
    it('responds with matching records', async function() {
      const users = await User.find({type: 'User'});
      users.should.have.length(3);
    });
  });