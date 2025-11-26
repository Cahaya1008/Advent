// day4.js
window.openDay4 = function(){
  if(window._AC_state.found[4]){ window.showModal(`<div style="padding:12px"><h3>Dec 4 — Found</h3><p>Letter: <strong>V</strong></p><div style="margin-top:10px"><button onclick="hideModal()">Close</button></div></div>`); return; }
  // change to your puzzle image URL here (PNG/JPG). For the 1000p jigsaw you gave, ideally use a hosted image.
  const imageURL = 'https://picsum.photos/seed/puzzle/900/900'; // replace with real puzzle image URL when ready
  const tilesPerRow = 6;
  const total = tilesPerRow*tilesPerRow;
  window.showModal(`<div style="padding:12px"><h3 style="color:var(--highlight)">Dec 4 — Jigsaw</h3>
    <p>Drag tiles to assemble the image. Click Inspect once assembled to reveal the letter on the back.</p>
    <div id="jigsawBoard" class="jigsawGrid" style="grid-template-columns:repeat(${tilesPerRow},110px);margin-top:12px"></div>
    <div style="margin-top:10px"><button id="shuffle4">Shuffle</button> <button id="inspect4" disabled>Inspect</button></div>
  </div>`);
  const board = document.getElementById('jigsawBoard');
  let tiles = Array.from({length:total},(_,i)=>i+1);
  function render(){
    board.innerHTML='';
    tiles.forEach((num,pos)=>{
      const d = document.createElement('div'); d.className='jigsawTile'; d.style.width='110px'; d.style.height='110px';
      const idx = num-1; const col = idx % tilesPerRow; const row = Math.floor(idx/tilesPerRow);
      const step = tilesPerRow===1 ? 0 : (100/(tilesPerRow-1));
      const posX = (col*step), posY=(row*step);
      d.style.backgroundImage = `url("${imageURL}")`;
      d.style.backgroundSize = `${tilesPerRow*100}% ${tilesPerRow*100}%`;
      d.style.backgroundPosition = `${posX}% ${posY}%`;
      d.draggable = true; d.dataset.pos = pos; d.dataset.tile = num;
      d.addEventListener('dragstart', e=>{ e.dataTransfer.setData('text/plain', pos); d.style.opacity='0.5'; });
      d.addEventListener('dragend', ()=>d.style.opacity='1');
      d.addEventListener('dragover', e=>e.preventDefault());
      d.addEventListener('drop', e=>{ e.preventDefault(); const from = parseInt(e.dataTransfer.getData('text/plain')); const to = parseInt(d.dataset.pos); const tmp = tiles[from]; tiles[from]=tiles[to]; tiles[to]=tmp; render(); checkSolved(); });
      board.appendChild(d);
    });
  }
  function shuffle(){ tiles.sort(()=>Math.random()-0.5); render(); document.getElementById('inspect4').disabled=true; }
  function checkSolved(){ for(let i=0;i<tiles.length;i++) if(tiles[i]!==i+1) return false; document.getElementById('inspect4').disabled=false; alert('Puzzle assembled! Click Inspect to reveal the back.'); return true; }
  document.getElementById('shuffle4').addEventListener('click', shuffle);
  document.getElementById('inspect4').addEventListener('click', ()=>{ window.showModal(`<div style="padding:12px"><h3>Back of puzzle</h3><p>The letter on the back is: <strong>V</strong></p><div style="margin-top:10px"><button onclick="window.storeLetter(4);hideModal()">Collect</button></div></div>`); });
  shuffle();
};
