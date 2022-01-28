var towerImg, tower,stars,starsImg;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostJump,spookySound;
var invisibleBlock, invisibleBlock,over,overImg;
var gameState = "play";
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  ghostJump = loadAnimation("ghost-jumping.png");
  spookySound = loadSound("Spooky.mp3");
  overImg = loadImage("download.png");
  starsImg = loadImage("stars.jpg")
}

function setup() {
  createCanvas(700, 600);
  
  stars = createSprite(650,300,100,1710)
  stars.addImage("stars",starsImg)
  stars.scale = 2;

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addAnimation("ghost",ghostImg);
  ghost.scale = 0.4;
  ghost.setCollider("rectangle",-30,35,100,250)
  
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();

  over = createSprite(300,250,50,50);
  over.addImage("over",overImg);
  over.scale = 1.2;
  over.visible = false;
}

function draw() 
{
  background("black");
  score += 1;

  textSize(20);
  fill("yellow")
  text("Score:" + score,600,30)

  if(tower.y > 400)
  {
    tower.y = height/2;
  }

  if(score>0 && score<500)
  {
    ghost.velocityY += .6;
  }else if(score > 500 && score < 1000)
  {
    ghost.velocityY += .7;
  }else if(score >1000 && score <1500)
  {
    ghost.velocityY += .8;
  }else 
  {
    ghost.velocityY += 1;
  }

  if(gameState = "play")
  {
   if(keyWentDown("space") && ghost.velocityY > -10 && ghost.y > 0)
   {
     ghost.velocityY -= 4.5;
   }
   if(keyDown("LEFT_ARROW") && ghost.x > 90)
   {
     ghost.x -= 2;
   }
   if(keyDown("RIGHT_ARROW") && ghost.x < 510)
   {
     ghost.x += 2;
   }
   if(ghost.y>600)
   {
     gameState = "end";
   }
  }

  if(gameState === "end")
  {
   ghost.destroy();
   score = -1;
   tower.velocityY = 0;
   doorsGroup.destroyEach();
   climbersGroup.destroyEach();
   invisibleBlockGroup.destroyEach();
   over.visible = true;
  }

  ghost.collide(invisibleBlockGroup)
  spawndoor();
  drawSprites();
}
function spawndoor()
{
  if(frameCount % 300 == 0)
  {
    var door = createSprite(Math.round(random(75,525)),40,10,10);
    door.addImage("door",doorImg)
    var climber = createSprite(door.x,94,40,10);
    climber.addImage("climber",climberImg);
    climber.scale = 0.63,
    invisibleBlock = createSprite(door.x,90,50,1);
    invisibleBlock.visible = false;
    invisibleBlock.setCollider("rectangle",5,2,55,1)
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}