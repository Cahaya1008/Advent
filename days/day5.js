// days/day5.js
window.openDay5 = function(){
  if(window._AC_state.found[5]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 5 — Riddle (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>N</strong></p></div>`, {size:'sm'});
    return;
  }
  // NOTE: To use your own image (day5.jpg):
  // 1) Create folder /img in your project root.
  // 2) Put your file at /img/day5.jpg (exact name).
  // 3) The code below references "img/day5.jpg" and will load it.
  const imagePath = 'img/day5.jpg'; // place your day5.jpg here
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 5 — Riddle & Picture</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>“By vicious beast I'm guarded, By death on silver wings. Like gold, I last eternal, Treasure to queens and kings.”</p>
    <div style="margin-top:8px"><input id="r5in" placeholder="answer"/><button class="primary" id="r5b">Submit</button> <button class="ghost" onclick="hideModal()">Exit</button></div>
    <div style="margin-top:12px"><strong>Optional image</strong><div style="margin-top:8px"><img src="${imagePath}" alt="Day 5 image" style="max-width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.04)"/></div></div>
  </div>`, {size:'md'});
  document.getElementById('r5b').addEventListener('click', ()=>{
    const v = (document.getElementById('r5in').value||'').trim().toLowerCase();
    if(v==='honey'){ window.storeLetter(5); } else alert('Not quite — try again.');
  });
};
