// day3.js
window.openDay3 = function(){
  if(window._AC_state.found[3]){ window.showModal(`<div style="padding:12px"><h3>Dec 3 — Found</h3><p>Letter: <strong>W</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 3 — Matching (You vs CPU)</h3>
    <p>30 cards (15 pairs). Take turns vs a CPU that remembers previously seen cards. Get more pairs than CPU to win.</p>
    <div id="matchBoard" class="matching-grid" style="margin-top:12px"></div>
    <div style="margin-top:12px"><button id="restart3">Restart</button><span id="matchStatus" class="muted" style="margin-left:12px"></span></div>
  </div>`);
  const board = document.getElementById('matchBoard'), status=document.getElementById('matchStatus');
  let icons = ['🐶','🐱','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🦄','🐝','🐙'];
  let cards, revealed, matched, cpuMemory, scores, playerTurn, firstFlip;
  function init(){
    cards = icons.concat(icons).sort(()=>Math.random()-0.5);
    revealed = Array(cards.length).fill(false); matched = Array(cards.length).fill(false);
    cpuMemory = {}; scores={player:0,cpu:0}; playerTurn=true; firstFlip=-1; render(); status.textContent='Your turn.';
  }
  function render(){
    board.innerHTML='';
    for(let i=0;i<cards.length;i++){
      const c = document.createElement('div'); c.className='matching-card';
      c.textContent = (matched[i]||revealed[i]) ? cards[i] : '';
      c.style.background = matched[i] ? '#e6f8ea' : '#fff';
      c.dataset.i = i; c.addEventListener('click', ()=>playerFlip(i));
      board.appendChild(c);
    }
  }
  function reveal(i){ revealed[i]=true; render(); }
  function hide(i){ revealed[i]=false; render(); }
  function playerFlip(i){
    if(!playerTurn || revealed[i] || matched[i]) return;
    reveal(i);
    if(firstFlip===-1){ firstFlip=i; return; }
    if(cards[firstFlip]===cards[i]){
      matched[firstFlip]=matched[i]=true; scores.player++; firstFlip=-1; render(); checkEnd();
    } else {
      playerTurn=false; status.textContent='CPU turn';
      setTimeout(()=>{ hide(firstFlip); hide(i); firstFlip=-1; render(); cpuAction(); },700);
    }
  }
  function cpuAction(){
    // clean memory
    for(let k in cpuMemory) cpuMemory[k] = cpuMemory[k].filter(idx=>!matched[idx]);
    // look for known pair
    for(let k in cpuMemory){
      if(cpuMemory[k].length>=2){
        const [a,b] = cpuMemory[k];
        reveal(a);
        setTimeout(()=>{ reveal(b); matched[a]=matched[b]=true; scores.cpu++; render(); checkEnd(); setTimeout(()=>cpuAction(),600); },450);
        return;
      }
    }
    // pick random unseen
    const pool=[]; for(let i=0;i<cards.length;i++) if(!revealed[i] && !matched[i]) pool.push(i);
    if(pool.length===0) return;
    const a = pool[Math.floor(Math.random()*pool.length)];
    reveal(a); cpuMemory[cards[a]] = Array.from(new Set([...(cpuMemory[cards[a]]||[]), a]));
    setTimeout(()=>{
      const seen = (cpuMemory[cards[a]]||[]).find(ii=>ii!==a && !matched[ii]);
      let b;
      if(seen!==undefined) b = seen;
      else {
        const pool2 = pool.filter(x=>x!==a);
        b = pool2.length ? pool2[Math.floor(Math.random()*pool2.length)] : null;
      }
      if(b===null){ playerTurn=true; status.textContent='Your turn.'; return; }
      reveal(b); cpuMemory[cards[b]] = Array.from(new Set([...(cpuMemory[cards[b]]||[]), b]));
      setTimeout(()=>{ if(cards[a]===cards[b]){ matched[a]=matched[b]=true; scores.cpu++; render(); checkEnd(); setTimeout(()=>cpuAction(),500); } else { hide(a); hide(b); render(); playerTurn=true; status.textContent='Your turn.'; } },500);
    },600);
  }
  function checkEnd(){
    if(matched.every(Boolean)){
      let msg=`Final score — You: ${scores.player} CPU: ${scores.cpu}. `;
      if(scores.player>scores.cpu){ msg+='You win — letter unlocked.'; status.textContent=msg; window.storeLetter(3); window.hideModal(); }
      else if(scores.player<scores.cpu){ msg+='CPU wins — restart to try again.'; status.textContent=msg; }
      else { msg+="It's a tie — restart to try again."; status.textContent=msg; }
    }
  }
  document.getElementById('restart3').addEventListener('click', ()=>init());
  init();
};
