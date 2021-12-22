var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY=3;
  frog = createSprite(200,350,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  climbersGroup=createGroup();
  coinsGroup=createGroup()
  //create coin group and climber group
  
}

function draw(){
  background(0);
  drawSprites();
  if(ocean.y>300){
    ocean.y=160;
}
fill("blue");
  textSize(20);  
  text("Score : "+ score, 200,50);
  if (gameState === "play") {
    if(keyDown("space") ){
      frog.velocityY = -12 ;
    }
    if(keyDown("right") ){
      frog.x=frog.x+20 ;
    }
    if(keyDown("left") ){
      frog.x=frog.x-20 ;
    }
   spawnCoin();
    //add gravity
    frog.velocityY = frog.velocityY + 0.8;
    if(frog.isTouching(climbersGroup)){
      frog.velocityY=0;
    }
    if(frog.isTouching(coinsGroup)){
     coinsGroup.destroyEach();
     score=score+1;
    }
    if(frog.y>500){
      gameState="end"
    }
  }
  
  if (gameState === "end"){
    textSize(30);  
    text("Game Over ", 200,200);
    coinsGroup.destroyEach();
    frog.destroy();
    climbersGroup.destroyEach();
    ocean.velocityY=0;
  }

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    var climber = createSprite(random(100,500),0,200,50);
    var coin = createSprite(climber.x,climber.y-20,200,50);
    climber.debug=true;
   
    climber.addImage("climber",climberImg);
    climber.setCollider("rectangle",0,0,climber.width-200,climber.height/3);
    coin.addImage("coin",coinImg);
    climber.setVelocity(0,2);
    coin.setVelocity(0,2);
    climber.scale = 0.2;
    coin.scale = 0.08;
    
    climbersGroup.add(climber);
    coinsGroup.add(coin);
  }
}

