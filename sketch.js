var bg_img,bg,player;
var enemy_img,player_img;
var score,score1;
var b1,bulletGroup,enemyGroup;
var shootSound,laser_img,backgroundMusic,lifeImage;
var score = 0;
var numberOfBullets = 35;
var life = 185;
var gameState = 1;
var muteBtn;

function preload(){
  bg_img = loadImage("images/background.jpg");
  player_img = loadImage("images/player.png");
  enemy_img = loadImage("images/spaceship.png");
  shootSound = loadSound("laserSound.mp3");
  laser_img = loadImage("images/laser.png");
  lifeImage = loadImage("images/life.png");
  backgroundMusic = loadSound("spaceMusic.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2-60,height/2-60);
  bg.addImage("background",bg_img);
  bg.scale = 0.25;
  muteBtn = createImg("images/mute.png");
  muteBtn.position(width-50,50);
  muteBtn.size(50,50);
  muteBtn.mouseClicked(mute);
   

  player = createSprite(width/2-250,height/2-100);
  player.addImage("spaceship",player_img);
  player.scale = 0.4;
  
bulletGroup = new Group();
enemyGroup = new Group();

  edges = createEdgeSprites();
  backgroundMusic.play();
  backgroundMusic.setVolume(1);
}

function draw() {
  if (gameState === 1) {
    
 if (keyDown(UP_ARROW)) {
   player.y = player.y-8;
 }
 if (keyDown(DOWN_ARROW)) {
   player.y = player.y+8;
 }
 if (keyDown(RIGHT_ARROW)) {
   player.x = player.x+8;
 }
 if (keyDown(LEFT_ARROW)) {
   player.x =player.x-8;
 }

 if (keyDown("M")) {
   createBullets(); 
 }
 createEnemy();

if (bulletGroup.isTouching(enemyGroup)) {
  bulletGroup.destroyEach();
  enemyGroup.destroyEach();
  score = score+2;
}

if (player.isTouching(enemyGroup)) {
   life = life-185/4;
   enemyGroup.destroyEach();
}

if ((life <= 0 || numberOfBullets <= 0) && score!== 25 ) {
  gameState = 2;
  gameOver();
   }

if ((life > 0 || numberOfBullets > 0) && score == 25) {
   gameState = 2;
   gameWinner();
}

 player.bounceOff(edges[0]);
 player.bounceOff(edges[1]);
 player.bounceOff(edges[2]);
 player.bounceOff(edges[3]);

 drawSprites();

 showLife();
 fill("white");
 textSize(20);
 text("Score:" + score,width-200,50);
 text("Number Of Bullets:" + numberOfBullets,width/2-500,50);
 text("Note: Use M key to fire",width/2-500,500);
}
  }

function createBullets(){
  var bullet = createSprite(player.x+170,player.y,30,20);
  bullet.velocityX = 15;
  bullet.addImage(laser_img);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
  numberOfBullets = numberOfBullets-1;
  shootSound.setVolume(0.2);
  shootSound.play();
}

function createEnemy(){
  if (frameCount % 100 == 0) {
 var enemy = createSprite(width/2+250,height/2-50);
 enemy.y = Math.round(random(width/2-10,height/2-180));
 enemy.x = Math.round(random(width/2-10,height/2-90));
  enemy.addImage("spaceship",enemy_img);
  enemy.scale = 0.5;
  enemy.setCollider("rectangle",0,0,100,260);
  enemyGroup.add(enemy);
  enemy.velocityY = -9;
  }
}

function showLife() {
  push();
  image(lifeImage, width / 2 - 130, height  - 500, 20, 20);
  fill("white");
  rect(width / 2 - 100, height  - 500, 185, 20);
  fill("#f50057");
  rect(width / 2 - 100, height  - 500, life, 20);
  noStroke();
  pop();
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "You Loose! Better Luck Next Time....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}

function gameWinner(){
  swal({
    title: ` Winner`,
    text: "You Win......!!!",
    imageUrl:
    "https://www.pngitem.com/pimgs/m/512-5121436_animated-emoji-thumbs-up-gif-hd-png-download.png",
    imageSize: "100x100",
    confirmButtonText: "Exit Game"
  });
}

function mute(){
  if (backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  }
  else{backgroundMusic.play()};
}