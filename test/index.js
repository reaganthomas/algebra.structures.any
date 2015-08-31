var assert = require('assert');
var laws = require('algebra.laws');
var Any = require('../lib');

function makeAny(a)     { return new Any(a); }
function makeListAny(a) { return new Any([a]); }

describe('Any', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListAny).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeAny).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeAny).asTest()(); });
  });

  describe('empty', function() {
    it('should create a Any(false)', function() {
      var any = makeAny(true);
      var any2 = any.empty();
      assert.equal(any2.inspect(), 'Any(false)');
    });
  });

  describe('concat', function() {
    it('should concat anys containing arrays', function() {
      var any = makeAny([false,false,false]);
      var any2 = makeAny([false,false,true]);
      assert.equal(any.concat(any2).inspect(), 'Any(true)');
    });

    it('should find any of anys containing single values', function() {
      var any = makeAny(false);
      var any2 = makeAny(true);
      assert.equal(any.concat(any2).inspect(), 'Any(true)');
    });

    it('should find any of anys that are both false', function() {
      var any = makeAny(false);
      var any2 = makeAny(false);
      assert.equal(any.concat(any2).inspect(), 'Any(false)');
    });
  });

  describe('inspect', function() {
    it('should show value of true', function() {
      var any = makeAny(true);
      assert.equal(any.inspect(), 'Any(true)');
    });

    it('should show value of false', function() {
      var any = makeAny(false);
      assert.equal(any.inspect(), 'Any(false)');
    });

    it('should show value of anyized array', function() {
      var any = makeAny([true,false,false]);
      assert.equal(any.inspect(), 'Any(true)');
    });
  });

  describe('isEqual', function() {
    it('should be true when anys are equal', function() {
      var any = makeAny(true);
      var any2 = makeAny(true);
      assert.equal(any.isEqual(any2), true);
    });

    it('should be false when anys are different', function() {
      var any = makeAny(true);
      var any2 = makeAny(false);
      assert.equal(any.isEqual(any2), false);
    });

    it('should be true for equal arrays', function() {
      var any = makeAny([true,false,false]);
      var any2 = makeAny([true,true,true]);
      assert.equal(any.isEqual(any2), true);
    });

    it('should be true for equal array and value', function() {
      var any = makeAny([true,false,false]);
      var any2 = makeAny(true);
      assert.equal(any.isEqual(any2), true);
    });
  });
});
