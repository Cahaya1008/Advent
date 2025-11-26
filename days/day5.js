// day5.js
window.openDay5 = function(){
  if(window._AC_state.found[5]){ window.showModal(`<div style="padding:12px"><h3>Dec 5 — Found</h3><p>Letter: <strong>N</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 5 — Riddle</h3>
    <p>“By vicious beast I'm guarded, By death on silver wings. Like gold, I last eternal, Treasure to queens and kings.”</p>
    <div style="margin-top:8px"><input id="r5in" placeholder="answer"/><button id="r5b">Submit</button></div>
  </div>`);
  document.getElementById('r5b').addEventListener('click', ()=>{
    const v=(document.getElementById('r5in').value||'').trim().toLowerCase();
    if(v==='honey'){ window.storeLetter(5); window.hideModal(); } else alert('Not quite — try again.');
  });
};
