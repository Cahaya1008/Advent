// day1.js
window.openDay1 = function(){
  if(window._AC_state.found[1]){ window.showModal(`<div style="padding:12px"><h3>Dec 1 — Already found</h3><p>Letter: <strong>R</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px">
    <h3 style="color:var(--highlight)">Dec 1 — Wordle</h3>
    <p>Guess the 5-letter word. When you guess THORN, click the correct letter in the solved word to collect the secret letter.</p>
    <div id="wRows" style="display:flex;flex-direction:column;gap:8px;margin-top:10px"></div>
    <div style="margin-top:8px"><input id="wGuess" maxlength="5" placeholder="enter 5 letters" style="padding:8px"/> <button id="wTry">Try</button></div>
    <div id="wHint" class="muted" style="margin-top:10px;display:none"></div>
  </div>`);
  const target='THORN';
  const rows=[];
  const rowsEl = document.getElementById('wRows');
  function render(){
    rowsEl.innerHTML='';
    rows.forEach(r=>{
      const row = document.createElement('div'); row.style.display='flex'; row.style.gap='6px';
      for(let i=0;i<5;i++){
        const ch = document.createElement('div');
        ch.style.width='46px'; ch.style.height='46px'; ch.style.display='flex'; ch.style.alignItems='center'; ch.style.justifyContent='center';
        ch.style.borderRadius='8px'; ch.style.background='#fff'; ch.style.color='#072'; ch.style.fontWeight='900';
        const L = r[i]||'';
        ch.textContent = L;
        if(L){
          if(L===target[i]) ch.style.background='#7cf';
          else if(target.includes(L)) ch.style.background='#ffd56b';
          else ch.style.background='#e6e6e6';
        }
        row.appendChild(ch);
      }
      rowsEl.appendChild(row);
    });
  }
  document.getElementById('wTry').addEventListener('click', ()=>{
    const g = (document.getElementById('wGuess').value||'').toUpperCase();
    if(g.length!==5){ alert('Enter 5 letters'); return; }
    rows.push(g); render(); document.getElementById('wGuess').value='';
    if(g===target){
      document.getElementById('wHint').style.display='block';
      document.getElementById('wHint').innerHTML = `<strong>Hint:</strong> Heart - heat = ? (click the correct letter in the solved word to store)`;
      const last = rowsEl.lastChild;
      for(let i=0;i<5;i++){
        const cell = last.children[i];
        cell.style.cursor='pointer';
        cell.addEventListener('click', ()=>{
          const clickedLetter = target[i];
          if(clickedLetter==='R'){ window.storeLetter(1); window.hideModal(); }
          else alert('Not the secret letter — try another.');
        });
      }
    }
  });
};
