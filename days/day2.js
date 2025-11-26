// day2.js
window.openDay2 = function(){
  if(window._AC_state.found[2]){ window.showModal(`<div style="padding:12px"><h3>Dec 2 — Found</h3><p>Letter: <strong>T</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 2 — Mini-Crossword</h3>
    <p>Solve the 3×3 crossword. The highlighted center becomes clickable once solved.</p>
    <div style="margin-top:10px;display:grid;grid-template-columns:repeat(3,56px);gap:4px">
      <input id="c00" maxlength="1"/><input id="c01" maxlength="1"/><input id="c02" maxlength="1"/>
      <input id="c10" maxlength="1"/><input id="c11" maxlength="1" style="background:#fff3c6;border:2px solid #f0d37a"/><input id="c12" maxlength="1"/>
      <input id="c20" maxlength="1"/><input id="c21" maxlength="1"/><input id="c22" maxlength="1"/>
    </div>
    <div style="margin-top:10px"><button id="check2">Check</button></div>
  </div>`);
  const sol = {c00:'L',c01:'I',c02:'P',c10:'A',c11:'T',c12:'E',c20:'R',c21:'E',c22:'D'};
  document.getElementById('check2').addEventListener('click', ()=>{
    let ok=true;
    for(const k in sol){ const v=(document.getElementById(k).value||'').toUpperCase(); if(v!==sol[k]){ ok=false; break; } }
    if(ok){
      const c11=document.getElementById('c11'); c11.readOnly=true; c11.style.cursor='pointer';
      c11.addEventListener('click', ()=>{ window.storeLetter(2); window.hideModal(); });
      alert('Solved! Click the highlighted center to collect the secret letter.');
    } else alert('Not solved yet — keep trying!');
  });
};
