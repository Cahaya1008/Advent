export function openDay4(showModal, addLetter, hideModal) {
  const size = 4; // 4x4 puzzle
  const imgSrc = "img/day4.jpg";
  
  const totalPieces = size * size;
  const fixedIndex = (size - 1) * size; // bottom-left tile
  
  showModal(`
    <h2 style="color:var(--highlight)">December 5 — Jigsaw Puzzle</h2>
    <p>Reassemble the picture!<br>
    <em style="color:var(--highlight)">Hint: The bottom-left tile is already in the correct position.</em></p>
    <div id="puzzleContainer" style="
      width: 520px; 
      height: 520px; 
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(${size}, 1fr);
      gap: 4px;
    "></div>

    <button onclick="hideModal()">Exit</button>
  `);

  const container = document.getElementById("puzzleContainer");

  // Load the image
  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    const pieceWidth = img.width / size;
    const pieceHeight = img.height / size;

    // Create all pieces
    let pieces = [];
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / size);
      const col = i % size;

      pieces.push({
        index: i,
        row,
        col,
        correctPos: i,
      });
    }

    // Shuffle EXCEPT the fixedIndex
    let movablePieces = pieces.filter(p => p.index !== fixedIndex);
    movablePieces = shuffleArray(movablePieces);

    // Re-merge with fixed piece in correct place
    let displayedPieces = [];
    let movableIndex = 0;

    for (let i = 0; i < totalPieces; i++) {
      if (i === fixedIndex) {
        displayedPieces.push(pieces[fixedIndex]); // keep anchored
      } else {
        displayedPieces.push(movablePieces[movableIndex++]);
      }
    }

    // Render pieces
    displayedPieces.forEach(piece => {
      const tile = document.createElement("div");

      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.backgroundImage = `url(${imgSrc})`;
      tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;

      // compute background offset
      const origRow = Math.floor(piece.correctPos / size);
      const origCol = piece.correctPos % size;

      tile.style.backgroundPosition = 
        `${-(origCol * 100)}% ${-(origRow * 100)}%`;

      tile.dataset.correct = piece.correctPos;

      // Style the fixed tile (bottom-left)
      if (piece.index === fixedIndex) {
        tile.style.border = "2px solid var(--highlight)";
        tile.style.boxShadow = "0 0 10px rgba(255,200,120,0.6)";
        tile.style.cursor = "default";
      } else {
        tile.style.cursor = "pointer";
      }

      tile.addEventListener("click", () => {
        if (piece.index === fixedIndex) return; // cannot interact
        handlePieceClick(tile);
      });

      container.appendChild(tile);
    });

    let firstTile = null;

    function handlePieceClick(tile) {
      if (!firstTile) {
        firstTile = tile;
        tile.style.outline = "2px solid var(--highlight)";
        return;
      }

      if (tile === firstTile) return;

      // Swap only if neither is fixed
      if (firstTile.dataset.correct == fixedIndex || tile.dataset.correct == fixedIndex) {
        firstTile.style.outline = "none";
        firstTile = null;
        return;
      }

      const tempPos = firstTile.style.backgroundPosition;
      firstTile.style.backgroundPosition = tile.style.backgroundPosition;
      tile.style.backgroundPosition = tempPos;

      firstTile.style.outline = "none";
      firstTile = null;

      checkWin();
    }

    function checkWin() {
      const tiles = [...container.children];
      let correct = true;

      tiles.forEach((tile, i) => {
        // compute expected position
        const row = Math.floor(i / size);
        const col = i % size;

        const expectedPos = `${-(col * 100)}% ${-(row * 100)}%`;

        if (tile.style.backgroundPosition !== expectedPos) {
          correct = false;
        }
      });

      if (correct) {
        showModal(`
          <h2 style="color:var(--highlight)">Puzzle Complete!</h2>
          <p>Letter found: <strong>V</strong></p>
          <button onclick="addLetter('V')">Collect Letter</button>
          <button onclick="hideModal()">Exit</button>
        `);
      }
    }
  };
}

// Shuffle utility
function shuffleArray(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
