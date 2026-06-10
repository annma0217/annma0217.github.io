new p5(function(p){

  let handImage;

  let fontSize = 6;
  let tracking = 7;
  let leading = 3;

  let imgScale, imgW, imgH, imgX, imgY;

  let offsetX = 0;
  let offsetY = 100;

  let cycleTime = 5000;

  p.preload = function(){
    handImage = p.loadImage("hand.jpg");
  };

  p.setup = function(){
    let box = document.getElementById("hand-canvas");
    let c = p.createCanvas(box.offsetWidth, box.offsetHeight);
    c.parent("hand-canvas");

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(fontSize);
    p.noStroke();

    setupImage();
    p.frameRate(30);
  };

  function setupImage(){
    imgScale = Math.min(p.width / handImage.width, p.height / handImage.height);

    imgW = handImage.width * imgScale;
    imgH = handImage.height * imgScale;

    imgX = (p.width - imgW) / 2 + offsetX;
    imgY = (p.height - imgH) / 2 + offsetY;
  }

  p.draw = function(){
    let rect = document.getElementById("hand-canvas").getBoundingClientRect();

    if(rect.bottom < 0 || rect.top > window.innerHeight){
      return;
    }

    p.background(0);

    let t = (p.millis() % cycleTime) / cycleTime;

    let appearProgress;
    let dissolveProgress;

    if(t < 0.5){
      appearProgress = p.map(t, 0, 0.5, 0, 1);
      dissolveProgress = 0;
    }else{
      appearProgress = 1;
      dissolveProgress = p.map(t, 0.5, 1, 0, 1);
    }

    drawDotHand(appearProgress, dissolveProgress);
  };

  function drawDotHand(appearProgress, dissolveProgress){
    for(let y = imgY; y < imgY + imgH; y += leading){
      for(let x = imgX; x < imgX + imgW; x += tracking){

        let imgPX = Math.floor((x - imgX) / imgScale);
        let imgPY = Math.floor((y - imgY) / imgScale);

        let c = handImage.get(imgPX, imgPY);

        let bright =
          (p.red(c) + p.green(c) + p.blue(c)) / 3;

        if(bright > 80){

          let pointLife = randomValue(imgPX, imgPY);

          if(pointLife > appearProgress) continue;
          if(pointLife < dissolveProgress) continue;

          let nX = p.map(
            p.noise(x * 0.01, y * 0.01, p.frameCount * 0.02),
            0, 1, -0.7, 0.7
          );

          let nY = p.map(
            p.noise(y * 0.01, x * 0.01, p.frameCount * 0.02),
            0, 1, -0.7, 0.7
          );

          p.fill(255);
          p.circle(x + nX, y + nY, 1.8);
        }
      }
    }
  }

  function randomValue(x, y){
    let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  p.windowResized = function(){
    let box = document.getElementById("hand-canvas");
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
    setupImage();
  };

});