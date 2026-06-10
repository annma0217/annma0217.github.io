new p5(function(p){
  let palette = ["#BAD6E4", "#F8F5EE", "#DBE0E4", "#E4D8DC", "#FFF3E3"];

  let xStep = 10;
  let xFreq = 0.003;
  let yFreq = 0.005;
  let amplitude = 100;
  let velocity = 0.01;
  let waveCount = 20;

  p.setup = function(){
    let box = document.getElementById('wave-canvas');
    let c = p.createCanvas(box.offsetWidth, box.offsetHeight);
    c.parent('wave-canvas');

    p.noStroke();
    p.frameRate(30);
  };

  p.draw = function(){
    let rect = document.getElementById('wave-canvas').getBoundingClientRect();

    if(rect.bottom < 0 || rect.top > window.innerHeight){
      return;
    }

    p.randomSeed(0);

    let c = p.shuffle([...palette]);
    p.background(c[0]);

    let yStep = p.height / waveCount;

    for(let y = 0; y <= p.height; y += yStep){
      p.push();
      p.translate(0, y);

      c = p.shuffle([...palette]);

      let gradient = p.drawingContext.createLinearGradient(
        0,
        p.height / 2,
        p.width,
        p.height / 2
      );

      gradient.addColorStop(0, c[0]);
      gradient.addColorStop(1, c[1]);

      p.drawingContext.fillStyle = gradient;

      p.beginShape();

      for(let x = 0; x <= p.width; x += xStep){
        let n =
          p.noise(
            x * xFreq,
            y * yFreq,
            p.frameCount * velocity
          ) * amplitude;

        p.vertex(x,n);
      }

      p.vertex(p.width,p.height);
      p.vertex(0,p.height);

      p.endShape(p.CLOSE);

      p.pop();
    }
  };

  p.windowResized = function(){
    let box = document.getElementById('wave-canvas');
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
  };
});