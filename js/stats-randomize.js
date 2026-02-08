(function(){
  'use strict';

  function randAround(n){
    if(n === 0) return Math.floor(Math.random() * 6); // 0-5
    var pct = 0.10; // ±10%
    var min = Math.max(0, Math.floor(n * (1 - pct)));
    var max = Math.ceil(n * (1 + pct));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateStats(){
    var nodes = document.querySelectorAll('.stat-count');
    nodes.forEach(function(el){
      var baseAttr = el.getAttribute('data-base');
      var base = baseAttr ? parseInt(baseAttr,10) : (parseInt(el.textContent.replace(/[^0-9]/g,''),10) || 0);
      el.setAttribute('data-base', base);
      var val = randAround(base);
      el.textContent = val;
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', updateStats);
  } else {
    updateStats();
  }

})();
