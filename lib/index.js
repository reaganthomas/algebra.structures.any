(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    Any

    Any is a Monoid, making it also a Semigroup.
    Any implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    Any only works for booleans or arrays of booleans. Should
    any other values be used the behavior is unspecified.
  **/
  var Any = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return (acc || val);
      }, false);
    } else {
      this.value = value || false;
    }
  });

  /**
    Any.empty

    Returns an "empty any", otherwise known as false.
  **/
  Any.prototype.empty = function() { return Any(false); };

  /**
    Any.concat

    Returns the result of oring the two any values.
  **/
  Any.prototype.concat = function(any2) {
    return Any(this.value || any2.value);
  };

  /**
    Any.inspect

    Returns the string representation of an Any.
  **/
  Any.prototype.inspect = function() { return 'Any(' + inspect(this.value) + ')'; };

  /**
    Any.isEqual

    Compares two Anys for equality.
  **/
  Any.prototype.isEqual = function(any2) { return deepEqual(this.value, any2.value); };

  module.exports = Any;
})();
