// days/day4.js
window.openDay4 = function(){
  if(window._AC_state.found[4]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 4 — Jigsaw (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>V</strong></p></div>`, {size:'lg'});
    return;
  }
  // Replace imageURL with your real puzzle image if available.
  const imageURL = 'https://picsum.photos/seed/puzzle/900/900';
  const tilesPerRow = 6;
  const total = tilesPerRow * tilesPerRow;
  window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 4 — Jigsaw</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
    <p>Drag tiles to assemble the image. Click Inspect when assembled to reveal the letter on the back.</p>
    <div id="jigsawBoard" class="jigsawGrid" style="grid-template-columns:repeat(${tilesPerRow},100px);margin-top:12px;display:grid"></div>
    <div style="margin-top:10px"><button class="primary" id="shuffle4">Shuffle</button> <button class="primary" id="inspect4" disabled>Inspect</button></div>
  </div>`, {size:'lg'});

  const board = document.getElementById('jigsawBoard');
  let tiles = Array.from({length: total}, (_,i)=>i+1);

  function render(){
    board.innerHTML='';
    tiles.forEach((num, pos)=>{
      const tile = document.createElement('div'); tile.className='jigsawTile';
      tile.style.width='100px'; tile.style.height='100px';
      const idx = num-1; const col = idx % tilesPerRow; const row = Math.floor(idx/tilesPerRow);
      const step = tilesPerRow===1 ? 0 : (100/(tilesPerRow-1));
      const posX = (col*step), posY=(row*step);
      tile.style.backgroundImage = `url("${imageURL}")`;
      tile.style.backgroundSize = `${tilesPerRow*100}% ${tilesPerRow*100}%`;
      tile.style.backgroundPosition = `${posX}% ${posY}%`;
      tile.draggable = true; tile.dataset.pos = pos; tile.dataset.tile = num;
      tile.addEventListener('dragstart', e=>{ e.dataTransfer.setData('text/plain', pos); tile.style.opacity='0.5'; });
      tile.addEventListener('dragend', ()=>tile.style.opacity='1');
      tile.addEventListener('dragover', e=>e.preventDefault());
      tile.addEventListener('drop', e=>{ e.preventDefault(); const from = parseInt(e.dataTransfer.getData('text/plain')); const to = parseInt(tile.dataset.pos); const tmp=tiles[from]; tiles[from]=tiles[to]; tiles[to]=tmp; render(); checkSolved(); });
      board.appendChild(tile);
    });
  }
  function shuffle(){ tiles.sort(()=>Math.random()-0.5); render(); document.getElementById('inspect4').disabled = true; }
  function checkSolved(){ for(let i=0;i<tiles.length;i++) if(tiles[i]!==i+1) return false; document.getElementById('inspect4').disabled=false; alert('Puzzle assembled! Click Inspect to reveal the back.'); return true; }
  document.getElementById('shuffle4').addEventListener('click', shuffle);
  document.getElementById('inspect4').addEventListener('click', ()=>{ window.showModal(`<div style="padding:12px"><h3>Back of puzzle</h3><p>The letter on the back is: <strong>V</strong></p><div style="margin-top:8px"><button class="primary" onclick="window.storeLetter(4);hideModal()">Collect</button> <button class="ghost" onclick="hideModal()">Exit</button></div></div>`, {size:'sm'}); });
  shuffle();
};
