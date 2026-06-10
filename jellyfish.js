new p5(function(p){
  let t = 0;

  p.setup = function(){
    let box = document.getElementById('jellyfish-canvas');
    let c = p.createCanvas(box.offsetWidth, box.offsetHeight);
    c.parent('jellyfish-canvas');

    p.stroke(255,66);
    p.frameRate(30);
  };

  p.draw = function(){
    let rect = document.getElementById('jellyfish-canvas').getBoundingClientRect();

    if(rect.bottom < 0 || rect.top > window.innerHeight){
      return;
    }

    p.background(0);

    t += p.PI / 30;

    for(let i=3500;i--;){
      a(i % 200, i / 43);
    }
  };

  function a(x,y){
    let k = 5 * p.cos(x / 14) * p.cos(y / 30);
    let e = y / 8 - 13;
    let d = p.mag(k,e) ** 2 / 59 + 4;

    let q =
      60 -
      3 * p.sin(p.atan2(k,e) * e) +
      k * (3 + 4 / d * p.sin(d * d - t * 2));

    let c = d / 2 + e / 99 - t / 18;

    p.point(
      q * p.sin(c) + p.width / 2,
      (q + d * 9) * p.cos(c) + p.height / 2
    );
  }

  p.windowResized = function(){
    let box = document.getElementById('jellyfish-canvas');
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
  };
});