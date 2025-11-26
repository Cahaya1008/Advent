// day6.js
window.openDay6 = function(){
  if(window._AC_state.found[6]){ window.showModal(`<div style="padding:12px"><h3>Dec 6 — Found</h3><p>Letter: <strong>P</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 6 — Maze</h3><p>Click the maze then use arrow keys to move the avatar (red) to the green box.</p><div id="mazeWrap" style="margin-top:12px;overflow:auto;max-height:60vh"></div></div>`);
  const wrap=document.getElementById('mazeWrap'); const rows=21, cols=21;
  const grid=Array(rows).fill(0).map(()=>Array(cols).fill(1));
  function carve(r,c){ const dirs=[[ -2,0],[2,0],[0,-2],[0,2]].sort(()=>Math.random()-0.5); grid[r][c]=0; for(const [dr,dc] of dirs){ const nr=r+dr,nc=c+dc; if(nr<=0||nr>=rows-1||nc<=0||nc>=cols-1) continue; if(grid[nr][nc]===1){ grid[r+dr/2][c+dc/2]=0; carve(nr,nc); } } }
  carve(1,1);
  let pr=1,pc=1,gr=rows-2,gc=cols-2;
  function render(){
    wrap.innerHTML=''; const m=document.createElement('div'); m.className='maze';
    for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ const cell=document.createElement('div'); cell.className='cell'; if(r===pr && c===pc) cell.style.background='red'; else if(r===gr && c===gc) cell.style.background='lightgreen'; else cell.style.background= grid[r][c]===1? '#111':'#fff'; m.appendChild(cell); } const br=document.createElement('div'); br.style.clear='both'; m.appendChild(br); }
    wrap.appendChild(m); m.tabIndex=0; m.focus();
    m.onkeydown = (e)=>{ if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){ e.preventDefault(); const map={'ArrowUp':[-1,0],'ArrowDown':[1,0],'ArrowLeft':[0,-1],'ArrowRight':[0,1]}; const [dr,dc]=map[e.key]; move(dr,dc); } };
  }
  function move(dr,dc){ const nr=pr+dr,nc=pc+dc; if(nr<0||nr>=rows||nc<0||nc>=cols) return; if(grid[nr][nc]===1) return; pr=nr; pc=nc; render(); if(pr===gr && pc===gc){ window.showModal(`<div style="padding:12px"><h3>The box opens!</h3><p>You found the secret letter: <strong>P</strong></p><div style="margin-top:10px"><button onclick="window.storeLetter(6);hideModal()">Collect</button></div></div>`); } }
  render();
};
