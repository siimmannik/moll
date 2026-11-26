window.TT={
  start(hero,mode,map){ const M=MOLL; M.SET.gameMode=mode||'horde'; if(map){ localStorage.moll_active=map; } M.state.picks=[hero||'kapi','vilkur']; M.state.nPlayers=1; document.querySelector('#start').click(); M.manual=true; },
  run(sec,opts){ opts=opts||{}; const M=MOLL; const n=Math.round(sec*60); for(let i=0;i<n;i++){ const p=M.state.players[0];
      if(opts.god&&p){ p.hp=p.maxHp; p.invuln=Math.max(p.invuln,0.1); if(!p.alive){ } }
      if(opts.fight&&p&&p.alive){ const es=M.ents.filter(e=>e.team==='e'&&e.alive&&!e.peaceful); let best=null,bd=1e9; for(const e of es){ const d=Math.hypot(e.pos.x-p.pos.x,e.pos.z-p.pos.z); if(d<bd){bd=d;best=e;} }
        for(const k of ['KeyW','KeyA','KeyS','KeyD'])M.keys[k]=false;
        if(best){ const a=Math.atan2(best.pos.x-p.pos.x,best.pos.z-p.pos.z); p.facing=a; p.yaw=a; if(bd>2.2)M.keys.KeyW=true; if(i%55===0)M.once.Space=true; if(i%400===7)M.once.KeyZ=true; if(i%600===13)M.once.KeyX=true; }
      }
      if(opts.each)opts.each(i);
      M.tick(1/60); }
    return {wave:M.state.wave,mode:M.state.mode,kills:M.state.kills,ents:M.ents.length,score:M.state.score}; },
  shot(){ MOLL.render(); }
};
TT.view=function(px,py,pz,tx,ty,tz,fov){ const M=MOLL; const c=new THREE.PerspectiveCamera(fov||50,innerWidth/innerHeight,.1,300); c.position.set(px,py,pz); c.lookAt(tx,ty,tz); M.renderer.setRenderTarget(null); M.renderer.setViewport(0,0,innerWidth,innerHeight); M.renderer.setScissorTest(false); M.renderer.render(M.scene,c); };
TT.p=function(){ const p=MOLL.state.players[0]; return [p.pos.x,p.pos.y,p.pos.z,p.facing]; };
