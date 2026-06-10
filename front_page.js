new p5(function(p){
  let num = 0;

  p.setup = function(){
    let c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.parent("bg-canvas");
    p.background(0);
    p.frameRate(30);
  };

  p.draw = function(){
    p.fill(0,30);
    p.noStroke();
    p.rect(0,0,p.width,p.height);

    p.translate(p.width/2,p.height/2);
    p.rotate(p.radians(num));

    p.stroke(255,150);
    p.noFill();

    let mx = p.map(p.mouseX,0,p.width,50,p.width*0.45);
    let my = p.map(p.mouseY,0,p.height,50,p.height*0.45);

    for(let i=0;i<360;i+=12){
      let x = p.sin(p.radians(i + num)) * mx;
      let y = p.tan(p.radians(i + num)) * my;

      p.bezier(0,0,0,0,x+y,y+x,x,y);
      p.bezier(0,0,0,0,-x+y,-y+x,-x,-y);
    }

    num += 0.22;
  };

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth,p.windowHeight);
    p.background(0);
  };
});