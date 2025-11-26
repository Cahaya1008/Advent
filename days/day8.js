// days/day8.js
window.openDay8 = function(){
  if(window._AC_state.found[8]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 8 — Quote Fill (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>D</strong></p></div>`, {size:'sm'});
    return;
  }
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 8 — Quote Fill</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>Fill in the blank: “I don't do ____, I don't talk about feelings”</p>
    <div style="margin-top:8px"><input id="q8"/><button class="primary" id="b8">Submit</button> <button class="ghost" id="hint8">Hint</button></div>
  </div>`, {size:'sm'});
  document.getElementById('b8').addEventListener('click', ()=>{ const v=(document.getElementById('q8').value||'').trim().toLowerCase(); if(v==='ships'){ window.storeLetter(8); } else alert('Try again.'); });
  document.getElementById('hint8').addEventListener('click', ()=>alert('Hint: it is from Lego Batman!'));
};
