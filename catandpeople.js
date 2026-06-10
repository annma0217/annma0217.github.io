new p5(function(p){
  let stars = [];
  let starDuration = 1000;

  p.setup = function(){
    let box = document.getElementById('cat-canvas');
    let c = p.createCanvas(box.offsetWidth, box.offsetHeight);
    c.parent('cat-canvas');

    p.frameRate(30);
  };

  p.draw = function(){
    let rect = document.getElementById('cat-canvas').getBoundingClientRect();

    if(rect.bottom < 0 || rect.top > window.innerHeight){
      return;
    }

    p.background(100,129,160);

    let s = Math.min(p.width,p.height) / 750;

    p.push();

    p.scale(s);

    p.translate(
      (p.width / s - 750) / 2,
      (p.height / s - 750) / 2
    );

    drawCatAndPeople();

    for(let i = stars.length - 1; i >= 0; i--){
      let star = stars[i];

      if(p.millis() - star.time > starDuration){
        stars.splice(i,1);
      }else{
        drawStar(star.x, star.y);
      }
    }

    p.pop();
  };

  p.mousePressed = function(){
    if(p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height){
      let s = Math.min(p.width,p.height) / 750;

      let x = p.mouseX / s - (p.width / s - 750) / 2;
      let y = p.mouseY / s - (p.height / s - 750) / 2;

      stars.push({
        x:x,
        y:y,
        time:p.millis()
      });
    }
  };

  p.windowResized = function(){
    let box = document.getElementById('cat-canvas');
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
  };

  function mx(){
    let s = Math.min(p.width,p.height) / 750;
    return p.mouseX / s - (p.width / s - 750) / 2;
  }

  function my(){
    let s = Math.min(p.width,p.height) / 750;
    return p.mouseY / s - (p.height / s - 750) / 2;
  }

  function drawStar(x,y){
    p.fill(255,223,0);
    p.stroke(235,196,0);
    p.strokeWeight(2);

    p.beginShape();

    p.vertex(x,y-10);
    p.vertex(x-10,y+5);
    p.vertex(x-20,y+10);
    p.vertex(x-10,y+15);
    p.vertex(x,y+30);
    p.vertex(x+10,y+15);
    p.vertex(x+20,y+10);
    p.vertex(x+10,y+5);

    p.endShape(p.CLOSE);
  }

  function drawCatAndPeople(){
    p.stroke(0);
    p.strokeWeight(3);

    p.line(400,260,370,260);
    p.line(435,270,376,273);
    p.line(442,280,373,285);

    p.noStroke();

    p.fill(140);
    p.ellipse(690,220,30,150);
    p.ellipse(600,300,190,160);

    p.fill(239,220,215);
    p.rect(480,500,90,110);

    p.fill(61);
    p.rect(570,480,100,100);

    p.fill(255,235,235);
    p.circle(500,450,300);

    p.fill(255);
    p.ellipse(420,450,70,70);

    p.fill(0);
    p.ellipse(
      p.constrain(mx(),410,430),
      p.constrain(my(),440,460),
      50,
      50
    );

    p.fill(255);
    p.ellipse(550,450,70,70);

    p.fill(0);
    p.ellipse(
      p.constrain(mx(),540,560),
      p.constrain(my(),440,460),
      50,
      50
    );

    p.stroke(0);
    p.strokeWeight(4.5);
    p.line(480,500,440,500);

    p.noStroke();
    p.fill(255,210,210);
    p.ellipse(455,479,20,20);

    p.fill(61);
    p.arc(507,420,330,334,p.PI,p.TWO_PI);

    p.fill(255,235,235);
    p.circle(650,450,100);

    p.stroke(0);
    p.strokeWeight(3);

    p.line(637,475,660,425);

    p.line(620,260,460,255);
    p.line(625,270,466,256);
    p.line(622,280,473,265);

    p.line(647,460,670,450);

    p.noStroke();

    p.fill(249,249,235);
    p.rect(405,605,250,160);

    p.fill(163);
    p.ellipse(495,270,190,160);

    p.triangle(420,180,404,250,530,260);
    p.triangle(580,180,480,250,590,260);

    p.fill(255);
    p.ellipse(450,255,60,60);

    p.fill(0);
    p.ellipse(
      p.constrain(mx(),445,455),
      p.constrain(my(),250,260),
      50,
      50
    );

    p.fill(255);
    p.ellipse(540,255,60,60);

    p.fill(0);
    p.ellipse(
      p.constrain(mx(),535,545),
      p.constrain(my(),250,260),
      50,
      50
    );
  }
});