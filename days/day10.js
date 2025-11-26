// day10.js
window.openDay10 = function(){
  if(window._AC_state.found[10]){ window.showModal(`<div style="padding:12px"><h3>Dec 10 — Found</h3><p>Letter: <strong>U</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];
  const solution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 10 — Sudoku (9×9)</h3>
    <p>Classic Sudoku — use up to <strong>3 hints</strong>. Revealed hints persist.</p>
    <div id="sudWrap" style="margin-top:12px"></div>
    <div style="margin-top:8px"><button id="sudReset">Reset</button> <button id="sudHint">Hint (<span id="hintLeft">${window._AC_state.sudokuHintsLeft}</span>)</button> <button id="sudExit">Exit</button></div>
    <div id="sudokuMsg" class="muted" style="margin-top:8px"></div>
  </div>`);
  const wrap=document.getElementById('sudWrap');
  function render(){
    wrap.innerHTML=''; const grid=document.createElement('div'); grid.className='grid-sudoku-9';
    for(let r=0;r<9;r++){ for(let c=0;c<9;c++){ const inp=document.createElement('input'); inp.type='text'; inp.maxLength=1; inp.dataset.r=r; inp.dataset.c=c;
        const key=`${r}-${c}`;
        if(window._AC_state.sudokuRevealed && window._AC_state.sudokuRevealed[key]){ inp.value=window._AC_state.sudokuRevealed[key]; inp.disabled=true; inp.style.background='#eef6ff'; }
        else if(puzzle[r][c] && puzzle[r][c]!==0){ inp.value=puzzle[r][c]; inp.disabled=true; inp.style.background='#eef6ff'; }
        else inp.value='';
        if(c%3===0) inp.style.borderLeft='3px solid #0b3b6f'; if(r%3===0) inp.style.borderTop='3px solid #0b3b6f';
        inp.addEventListener('input', ()=>{ inp.value=inp.value.replace(/[^1-9]/g,''); checkComplete(); });
        grid.appendChild(inp);
    } }
    wrap.appendChild(grid);
  }
  function checkComplete(){
    const inputs = wrap.querySelectorAll('input');
    for(const inp of inputs) if(inp.value.trim()==='') return false;
    // verify
    for(const inp of inputs){ const r=parseInt(inp.dataset.r), c=parseInt(inp.dataset.c); if(parseInt(inp.value)!==solution[r][c]) return false; }
    alert('Sudoku solved! Letter U unlocked.'); window.storeLetter(10); window.hideModal(); return true;
  }
  document.getElementById('sudReset').addEventListener('click', ()=>{ render(); document.getElementById('sudokuMsg').textContent='Grid reset (persisted hints kept).'; });
  document.getElementById('sudHint').addEventListener('click', ()=>{
    if(window._AC_state.sudokuHintsLeft<=0){ alert('No hints left'); return; }
    // find first empty
    for(let r=0;r<9;r++){ for(let c=0;c<9;c++){ const key=`${r}-${c}`; if(puzzle[r][c] && puzzle[r][c]!==0) continue; if(window._AC_state.sudokuRevealed && window._AC_state.sudokuRevealed[key]) continue;
          // reveal that cell with solution
          window._AC_state.sudokuRevealed = window._AC_state.sudokuRevealed || {}; window._AC_state.sudokuRevealed[key] = solution[r][c];
          window._AC_state.sudokuHintsLeft = Math.max(0, window._AC_state.sudokuHintsLeft-1);
          document.getElementById('hintLeft').textContent = window._AC_state.sudokuHintsLeft;
          saveState(); render(); return;
    } }
    alert('No suitable empty cell found for hint.');
  });
  document.getElementById('sudExit').addEventListener('click', ()=>window.hideModal());
  render();
};
