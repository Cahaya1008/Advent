export function openDay2(showModal, addLetter, hideModal) {
  showModal(`
    <h2 style="color:var(--highlight)">December 2 — Crossword</h2>
    <p>Fill in all the letters. Once complete, click the highlighted tile to reveal the secret letter.</p>

    <div id="crossContainer" style="
      margin: 0 auto;
      width: 260px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      font-size: 1.6rem;
    "></div>

    <p style="margin-top:15px; color:var(--highlight)">Clues:</p>

    <ul style="font-size:1rem; line-height:1.4;">
      <li><b>Column 1</b>: 1) Pet animal • 2) Night bird • 3) Number after nine</li>
      <li><b>Column 2</b>: 1) First alphabet letter • 2) Says “hoo-hoo” • 3) Opposite of odd</li>
      <li><b>Column 3</b>: 1) Purring animal • 2) Feathery hunter • 3) Ends with “-teen”</li>
    </ul>

    <button onclick="hideModal()">Exit</button>
  `);

  const solution = [
    "C","A","T",
    "O","W","L",
    "T","E","N"
  ];

  const highlightIndex = 2; // the T in CAT

  const container = document.getElementById("crossContainer");

  solution.forEach((correct, i) => {
    const box = document.createElement("input");
    box.maxLength = 1;
    box.style.width = "65px";
    box.style.height = "65px";
    box.style.textAlign = "center";
    box.style.background = "rgba(255,255,255,0.08)";
    box.style.border = (i === highlightIndex)
      ? "2px solid var(--highlight)"
      : "1px solid rgba(255,255,255,0.2)";
    box.style.color = "var(--text)";
    box.style.fontSize = "1.4rem";

    box.dataset.correct = correct;

    if (i === highlightIndex) {
      box.style.cursor = "pointer";
      box.addEventListener("click", () => {
        if (isComplete()) {
          showModal(`
            <h2 style="color:var(--highlight)">Crossword Complete!</h2>
            <p>You found the letter: <strong>T</strong></p>
            <button onclick="addLetter('T')">Collect Letter</button>
            <button onclick="hideModal()">Exit</button>
          `);
        }
      });
    }

    container.appendChild(box);
  });

  function isComplete() {
    const boxes = [...container.children];
    return boxes.every(b => b.value.toUpperCase() === b.dataset.correct);
  }
}
