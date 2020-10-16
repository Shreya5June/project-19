var bananaImage, stoneImage, backImage, player_running, score, mokey_stop
var Play, End, gameState

function preload () {
  
  player_running = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_04.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png")
  
  backImage = loadImage("jungle.jpg")
  stoneImage = loadImage("stone.png")
  bananaImage = loadImage("banana.png")
  
  monkey_stop = loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(600, 400);
  
  Play = 1
  End = 0
  gameState = Play
        
  backGround1 = createSprite(0,0,10,10)
  backGround1.addImage("jungle",backImage)
  backGround1.scale = 1.5;
  backGround1.velocityX=-2;
  
  invisibleGround = createSprite(600,300,10,10)
  invisibleGround.visible = false
  
  monkey = createSprite(50,280,10,10)
  monkey.addAnimation("player_running",player_running)
  monkey.scale = 0.2;
  
  FoodGroup = new Group()
  StoneGroup = new Group()
  
  score = 0
  
}

function draw() {
  background("white");
  
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: "+ score, 500,50);
  
  if(gameState == Play) {
  
  if(backGround1.x<0) {
    backGround1.x = backGround1.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)) {
    monkey.scale = 0.8
    score = score+10
    FoodGroup.destroyEach()
  }
  
  if(keyDown('space') && monkey.y>=100) {
    monkey.velocityY = -4;
  }
  
  monkey.velocityY = monkey.velocityY + 0.4
  
  
  switch(score) {
      case 10: monkey.scale(0.12);
              break;
      case 20: monkey.scale(0.14);
              break;
      case 30: monkey.scale(0.16);
              break;
      case 40: monkey.scale(0.18);
              break;
      default: break;}
  
    
  spawnFood();
  spawnStone();
    
    if(StoneGroup.isTouching(monkey)) {
    monkey.scale = 0.2;
    score = score-5
    gameState = End
   }  
}
  
  else if(gameState == End) {
    
    monkey.velocityY = 0
    monkey.velocityX = 0
    backGround1.velocityX = 0
    FoodGroup.setVelocityXEach(0)
    StoneGroup.setVelocityXEach(0)
    monkey.changeAnimation("Monkey_01",monkey_stop)
    score = 0
    
    textSize(20);
    fill("green");
    text("Game over",150,200);
    text("Press up key to restart",110,240);
    
  }
  
  if(keyDown("UP_ARROW")) {
    gameState = Play; 
    monkey.changeAnimation("player_running",player_running);
    FoodGroup.destroyEach();
    StoneGroup.destroyEach();
  }
  
  monkey.collide(invisibleGround)
  drawSprites()
}

function spawnFood () {
  if(frameCount%80 ==0) {
      var banana = createSprite(400,350);
      banana.scale = 0.05;
      banana.y = Math.round(random(80,120));
      banana.velocityX = -3;
      banana.addImage("banana",bananaImage)
      FoodGroup.add(banana);
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth+1;
   }
}

function spawnStone() {
  if (frameCount%300 == 0) {
    var stone = createSprite(400,320);
    stone.addImage("stone",stoneImage);
    stone.velocityX = -3;
    stone.scale = 0.15;
    StoneGroup.add(stone);
    stone.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
  }
}