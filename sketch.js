//Global variables

var bgImage, backGround, ground;
var bananaGroup, bananaImg, obsGroup, obsImg, player, playerImg;
var score = 0;

function preload() {
  bgImage = loadImage("jungle.jpg");
  playerImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("Banana.png");
  obsImg = loadImage("stone.png");

}

function setup() {
  createCanvas(600, 300);

  backGround = createSprite(0, 0, 600, 300);
  backGround.addImage(bgImg);
  backGround.scale = 1.5;
  backGround.x = backGround.width / 2;
  backGround.velocityX = -4;

  player = createSprite(100, 240, 20, 50);
  player.addAnimation("player", playerImg);
  player.scale = 0.1;

  ground = createSprite(400, 250, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  bananaGroup = new Group();
  obsGroup = new Group();
 
  score = 0;
}

function draw() {

  background(255);


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (backGround.x < 100) {
    backGround.x = backGround.width / 2;
  }

  if (bananaGroup.isTouching(player)) {
    bananaGroup.destroyEach();
    score++;
  }
  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }

  //jump
  if (keyDown("space")) {
    player.velocityY = -12;
  }
  //gravity
  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);
  spawnFood();
  spawnObstacles();

  if (obstaclesGroup.isTouching(player)) {
    player.scale = 0.08;
  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;

    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obsImg);

    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obsGroup.add(obstacle);
  }
}