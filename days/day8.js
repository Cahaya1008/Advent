// day8.js
window.openDay8 = function(){
  if(window._AC_state.found[8]){ window.showModal(`<div style="padding:12px"><h3>Dec 8 — Found</h3><p>Letter: <strong>D</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 8 — Quote Fill</h3>
    <p>Fill in: “I don't do ____, I don't talk about feelings”</p>
    <div style="margin-top:8px"><input id="q8"/><button id="b8">Submit</button> <button id="hint8">Hint</button></div>
  </div>`);
  document.getElementById('b8').addEventListener('click', ()=>{ const v=(document.getElementById('q8').value||'').trim().toLowerCase(); if(v==='ships'){ window.storeLetter(8); window.hideModal(); } else alert('Try again.'); });
  document.getElementById('hint8').addEventListener('click', ()=>alert('Hint: it is from Lego Batman!'));
};
