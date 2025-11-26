// day7.js
window.openDay7 = function(){
  if(window._AC_state.found[7]){ window.showModal(`<div style="padding:12px"><h3>Dec 7 — Found</h3><p>Letter: <strong>F</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 7 — Color Sequence</h3><p>Pass 5 rounds (lengths 3→7) to earn the secret letter. Bonus rounds after that are optional.</p>
    <div style="margin-top:12px;display:flex;gap:12px" id="simRow">
      <button id="s0" class="simonBtn" style="background:#ff6b6b">1</button>
      <button id="s1" class="simonBtn" style="background:#ffd93d">2</button>
      <button id="s2" class="simonBtn" style="background:#6bff9e">3</button>
      <button id="s3" class="simonBtn" style="background:#6bc3ff">4</button>
    </div>
    <div style="margin-top:12px"><button id="start7">Start</button> <span id="s7msg" class="muted" style="margin-left:12px"></span></div>
  </div>`);
  const btns=[document.getElementById('s0'),document.getElementById('s1'),document.getElementById('s2'),document.getElementById('s3')];
  const msg=document.getElementById('s7msg');
  function flash(i,fast=false){ const b=btns[i]; b.classList.add('simonFlash'); setTimeout(()=>b.classList.remove('simonFlash'), fast?120:350); }
  async function play(length,fast=false){
    const seq=[]; for(let i=0;i<length;i++) seq.push(Math.floor(Math.random()*4));
    for(const v of seq){ flash(v,fast); await new Promise(r=>setTimeout(r, fast?140:480)); }
    let idx=0;
    return new Promise(resolve=>{
      function handler(e){ const i = btns.indexOf(e.target); if(i===-1) return; flash(i,false); if(i!==seq[idx]){ btns.forEach(b=>b.removeEventListener('click', handler)); resolve(false); return; } idx++; if(idx===seq.length){ btns.forEach(b=>b.removeEventListener('click', handler)); resolve(true);} }
      btns.forEach(b=>b.addEventListener('click', handler));
    });
  }
  document.getElementById('start7').addEventListener('click', async ()=>{
    msg.textContent='Good luck';
    let passed=0; const rounds=[3,4,5,6,7];
    for(let i=0;i<rounds.length;i++){
      msg.textContent=`Round ${i+1}: ${rounds[i]} flashes`;
      const ok = await play(rounds[i], false);
      if(ok){ passed++; msg.textContent=`Passed ${i+1}`; if(passed===5){ alert('Five rounds passed — letter unlocked'); window.storeLetter(7); } await new Promise(r=>setTimeout(r,400)); }
      else { msg.textContent=`Failed on round ${i+1}`; if(passed<5) alert('You did not pass enough rounds. Try again.'); return; }
    }
    // bonus impossible fast round (optional)
    msg.textContent='Bonus fast round (optional)';
    await play(10,true).catch(()=>{});
    msg.textContent='Done';
  });
};
