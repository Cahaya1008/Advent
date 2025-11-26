// days/day11.js
window.openDay11 = function(){
  if(window._AC_state.found[11]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 11 — Minesweeper (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>I</strong></p></div>`, {size:'lg'});
    return;
  }
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 11 — Minesweeper</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>25×25 grid with 100 bombs. First click is safe. Left-click reveals, right-click flags.</p>
    <div style="margin-top:8px"><button class="primary" id="mineReset">Reset</button> <button class="ghost" id="mineHelp">?</button></div>
    <div id="mineArea" style="margin-top:12px;max-height:60vh;overflow:auto"></div>
  </div>`, {size:'lg'});

  const area = document.getElementById('mineArea'); const rows=25, cols=25, bombsTotal=100;
  let grid=[], revealed=[], flagged=[], placed=false;
  function buildEmpty(){ grid = Array(rows).fill(0).map(()=>Array(cols).fill(0)); revealed = Array(rows).fill(0).map(()=>Array(cols).fill(false)); flagged = Array(rows).fill(0).map(()=>Array(cols).fill(false)); placed=false; }
  buildEmpty();
  function placeBombsAvoid(firstR, firstC){
    let placedCount = 0;
    const forbidden = new Set();
    for(let dr=-1; dr<=1; dr++) for(let dc=-1; dc<=1; dc++){
      const nr = firstR + dr, nc = firstC + dc;
      if(nr>=0 && nr<rows && nc>=0 && nc<cols) forbidden.add(`${nr}-${nc}`);
    }
    while(placedCount < bombsTotal){
      const r = Math.floor(Math.random()*rows), c = Math.floor(Math.random()*cols), key = `${r}-${c}`;
      if(forbidden.has(key) || grid[r][c]===-1) continue;
      grid[r][c] = -1; placedCount++;
    }
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        if(grid[r][c]===-1) continue;
        let cnt=0;
        for(let dr=-1; dr<=1; dr++) for(let dc=-1; dc<=1; dc++){
          const nr=r+dr, nc=c+dc;
          if(nr<0||nr>=rows||nc<0||nc>=cols) continue;
          if(grid[nr][nc]===-1) cnt++;
        }
        grid[r][c] = cnt;
      }
    }
    placed = true;
  }
  function render(){
    area.innerHTML='';
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const btn = document.createElement('div');
        btn.style.width='18px'; btn.style.height='18px'; btn.style.display='inline-flex'; btn.style.alignItems='center'; btn.style.justifyContent='center';
        btn.style.border='1px solid rgba(0,0,0,0.12)'; btn.style.background = revealed[r][c] ? '#fff' : '#e9f3ff';
        btn.style.fontSize='11px'; btn.style.cursor='pointer'; btn.style.color = '#1a2430';
        if(flagged[r][c] && !revealed[r][c]) btn.textContent='🚩';
        else if(revealed[r][c]){
          if(grid[r][c]===-1) { btn.textContent='💣'; btn.style.background='#ffd2d2'; }
          else if(grid[r][c]===0){ btn.textContent=''; }
          else { btn.textContent = grid[r][c]; btn.style.fontWeight='700'; btn.style.color = ['#0b5c7a','#0b8a47','#ad3b3b','#322b8a','#a0522d','#006064','#7b1fa2','#4a148c'][grid[r][c]%8]; }
        }
        btn.addEventListener('click', ()=>onReveal(r,c));
        btn.addEventListener('contextmenu', (ev)=>{ ev.preventDefault(); toggleFlag(r,c); });
        area.appendChild(btn);
      }
      const br = document.createElement('div'); br.style.clear='both'; area.appendChild(br);
    }
  }
  function revealCell(r,c){
    if(r<0||r>=rows||c<0||c>=cols) return;
    if(revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if(grid[r][c] === 0){
      for(let dr=-1; dr<=1; dr++) for(let dc=-1; dc<=1; dc++) if(!(dr===0 && dc===0)) revealCell(r+dr, c+dc);
    }
  }
  function onReveal(r,c){
    if(!placed){ placeBombsAvoid(r,c); }
    if(grid[r][c]===-1){
      // reveal all bombs
      for(let i=0;i<rows;i++) for(let j=0;j<cols;j++) if(grid[i][j]===-1) revealed[i][j]=true;
      render(); alert('BOOM! You hit a bomb. Try Reset.'); buildEmpty(); return;
    } else {
      revealCell(r,c); render();
      let won = true;
      for(let i=0;i<rows;i++) for(let j=0;j<cols;j++){
        if(grid[i][j] !== -1 && !revealed[i][j]) { won=false; break; }
      }
      if(won){ alert('You cleared the minefield! Letter I collected.'); window.storeLetter(11); }
    }
  }
  function toggleFlag(r,c){ flagged[r][c] = !flagged[r][c]; render(); }
  document.getElementById('mineReset').addEventListener('click', ()=>{ buildEmpty(); render(); });
  document.getElementById('mineHelp').addEventListener('click', ()=>alert('Minesweeper rules:\n- Reveal all non-mine cells to win.\n- Numbers show how many mines are adjacent (8 neighbors).\n- Right-click to place flags.\n- First click is always safe.'));
  render();
};
