(function(){
  window.HuntedHaunters = {};
  var HuntedHaunters = window.HuntedHaunters;

  HuntedHaunters.Utils = {};

  HuntedHaunters.Utils.numberToPrice = function(number) {
    if (typeof number !== 'undefined' && number !== null)
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return '0';
  }
})();