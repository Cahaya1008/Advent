// days/day6.js
window.openDay6 = function(){
  if(window._AC_state.found[6]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 6 — Maze (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>P</strong></p></div>`, {size:'sm'});
    return;
  }
  // larger, wider maze (rows x cols)
  const rows = 21, cols = 31; // wider than tall
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 6 — Maze</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>Click inside the maze then use arrow keys to move the avatar (red) to the green box (goal).</p>
    <div class="mazeWrap" style="margin-top:12px"><div class="mazeCanvas" id="mazeWrap" style="max-width:920px;overflow:auto"></div></div>
    <div style="margin-top:8px" class="muted">Use arrow keys. Click maze area first to focus.</div>
  </div>`, {size:'lg'});

  const wrap = document.getElementById('mazeWrap');
  const grid = Array(rows).fill(0).map(()=>Array(cols).fill(1));
  function carve(r,c){
    const dirs = [[-2,0],[2,0],[0,-2],[0,2]].sort(()=>Math.random()-0.5);
    grid[r][c] = 0;
    for(const [dr,dc] of dirs){
      const nr = r+dr, nc = c+dc;
      if(nr<=0||nr>=rows-1||nc<=0||nc>=cols-1) continue;
      if(grid[nr][nc]===1){ grid[r+dr/2][c+dc/2]=0; carve(nr,nc); }
    }
  }
  carve(1,1);
  let pr=1, pc=1, gr=rows-2, gc=cols-2;
  function render(){
    wrap.innerHTML='';
    const m=document.createElement('div'); m.style.width='100%';
    for(let r=0;r<rows;r++){
      const rowEl = document.createElement('div'); rowEl.style.height='14px';
      for(let c=0;c<cols;c++){
        const cell = document.createElement('div'); cell.style.width='14px'; cell.style.height='14px'; cell.style.display='inline-block';
        if(r===pr && c===pc) cell.style.background='red';
        else if(r===gr && c===gc) cell.style.background='lightgreen';
        else cell.style.background = grid[r][c]===1 ? '#0d2433' : '#fff';
        cell.style.border = '1px solid rgba(0,0,0,0.08)';
        rowEl.appendChild(cell);
      }
      m.appendChild(rowEl);
    }
    wrap.appendChild(m);
    m.tabIndex = 0; m.focus();
    m.onkeydown = (e)=>{ if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){ e.preventDefault(); const map={'ArrowUp':[-1,0],'ArrowDown':[1,0],'ArrowLeft':[0,-1],'ArrowRight':[0,1]}; const [dr,dc] = map[e.key]; move(dr,dc); } };
  }
  function move(dr,dc){
    const nr = pr+dr, nc = pc+dc;
    if(nr<0||nr>=rows||nc<0||nc>=cols) return;
    if(grid[nr][nc]===1) return;
    pr = nr; pc = nc; render();
    if(pr===gr && pc===gc){ window.storeLetter(6); }
  }
  render();
};
