;(function(d, _id) {
  var ctx = d.getElementById(_id) || d.body;

  /*
    [].forEach detection, shim
    via: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
  */
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
      for(var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope || this, this[i], i, this);
      }
    }
  }

  /*
    nifty, via: https://gist.github.com/1502737
    (at least in webkit...) turns the NodeList returned
    by getElementsByTagName('a') into a proper javascript
    Array object and iterates over it.
   */
  [].slice.call(ctx.getElementsByTagName('a')).forEach(function(e) {
    e.style.setProperty('background-color', 'papayaWhip');
  });
}(document, 'main'));
