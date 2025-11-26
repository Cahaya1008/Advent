// days/day2.js
window.openDay2 = function(){
  if(window._AC_state.found[2]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 2 — Mini-Crossword (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>T</strong></p></div>`, {size:'sm'});
    return;
  }
  // improved clues & prompts
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 2 — Mini-Crossword</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>Solve the 3×3 crossword. Across: 1) Part of the mouth that helps speak (3) — LIP. 2) Past of eat (3) — ATE. 3) Color (3) — RED. Down: 1) Small word often 'the' (3) — THE. 2) A small rodent (3) — RAT.</p>
    <div style="margin-top:10px;display:grid;grid-template-columns:repeat(3,56px);gap:4px">
      <input id="c00" maxlength="1"/><input id="c01" maxlength="1"/><input id="c02" maxlength="1"/>
      <input id="c10" maxlength="1"/><input id="c11" maxlength="1" style="background:#fff3c6;border:2px solid #f0d37a"/><input id="c12" maxlength="1"/>
      <input id="c20" maxlength="1"/><input id="c21" maxlength="1"/><input id="c22" maxlength="1"/>
    </div>
    <div style="margin-top:10px"><button class="primary" id="check2">Check Crossword</button> <button class="ghost" onclick="hideModal()">Exit</button></div>
  </div>`, {size:'sm'});

  const solution = { c00:'L', c01:'I', c02:'P', c10:'A', c11:'T', c12:'E', c20:'R', c21:'E', c22:'D' };
  document.getElementById('check2').addEventListener('click', ()=>{
    let ok=true;
    for(const id in solution){
      const v = (document.getElementById(id).value||'').toUpperCase();
      if(v !== solution[id]) { ok=false; break; }
    }
    if(ok){
      // Show "Letter found!" + collect button inside modal
      window.storeLetter(2);
      // storeLetter appends banner inside modal — user can close via Exit
    } else {
      alert('Not solved yet — keep trying!');
    }
  });
};
