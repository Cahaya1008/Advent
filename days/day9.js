// days/day9.js
window.openDay9 = function(){
  if(window._AC_state.found[9]){
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 9 — Spot the Difference (Found)</h3><button class="ghost" onclick="hideModal()">Exit</button></div><p>Letter: <strong>A</strong></p></div>`, {size:'sm'});
    return;
  }
  const pairs = [
    {left:'https://picsum.photos/seed/d1/640/420', right:'https://picsum.photos/seed/d1b/640/420', x:220,y:130,r:30},
    {left:'https://picsum.photos/seed/d2/640/420', right:'https://picsum.photos/seed/d2b/640/420', x:110,y:60,r:28},
    {left:'https://picsum.photos/seed/d3/640/420', right:'https://picsum.photos/seed/d3b/640/420', x:310,y:185,r:26},
    {left:'https://picsum.photos/seed/d4/640/420', right:'https://picsum.photos/seed/d4b/640/420', x:260,y:95,r:30}
  ];
  let stage=0;
  function renderStage(){
    const p = pairs[stage];
    window.showModal(`<div style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="color:var(--gold)">Dec 9 — Spot the Difference</h3><button class="ghost" onclick="hideModal()">Exit</button></div>
      <p>Click the difference on the RIGHT image.</p>
      <div style="display:flex;gap:12px;margin-top:12px">
        <div style="width:320px;height:200px;border:3px solid #e6eefc;overflow:hidden"><img src="${p.left}" style="width:100%;height:100%;object-fit:cover"/></div>
        <div id="spotR" style="width:320px;height:200px;border:3px solid #e6eefc;overflow:hidden;cursor:pointer"><img src="${p.right}" style="width:100%;height:100%;object-fit:cover"/></div>
      </div>
      <div style="margin-top:8px" class="muted">Click the approximate spot.</div>
    </div>`, {size:'sm'});
    const right = document.getElementById('spotR');
    right.addEventListener('click',(ev)=>{
      const rect = right.getBoundingClientRect();
      const cx = ev.clientX - rect.left, cy = ev.clientY - rect.top;
      const scaleX = rect.width/640, scaleY = rect.height/420;
      const tx = p.x*scaleX, ty = p.y*scaleY, r = p.r*((scaleX+scaleY)/2);
      const dist = Math.hypot(cx-tx, cy-ty);
      if(dist<=r){ stage++; if(stage>=pairs.length){ alert('All differences found — letter unlocked'); window.storeLetter(9); } else { alert('Good! Next pair.'); renderStage(); } }
      else alert('Not correct — try again.');
    },{once:true});
  }
  renderStage();
};
