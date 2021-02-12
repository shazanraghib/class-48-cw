var gino;
var ground;
var Health=100;
var gameState=0;
var villian;
var batGroup,batonGroup,crockGroup,digGroup,snakeGroup;
var gameover;

function preload(){
   heroImg = loadAnimation("idle/idle01.png");
   bgImg = loadImage("bg.jpeg");
   gino_running = loadAnimation("running/run01.png","running/run02.png","running/run03.png",
             "running/run04.png", "running/run05.png","running/run06.png",
              "running/run07.png","running/run08.png");

  batFly = loadAnimation("batso/fly01.png","batso/fly02.png","batso/fly03.png","batso/fly04.png",
  "batso/fly05.png","batso/fly06.png","batso/fly07.png",)
  
  healthImg = loadImage("28.png");

  diggerImg = loadAnimation("digger/idle01.png");
  diggerHit = loadAnimation("digger/hit01.png","digger/hit02.png","digger/hit03.png");

  auntBatonImg = loadImage("aunt baton/idle01.png");

  batig = loadImage("batso/fly01.png");
  diggerig = loadImage("digger/idle01.png");

  snakeAnm = loadAnimation("snake girl/attack01.png","snake girl/attack02.png",
  "snake girl/attack03.png","snake girl/attack04.png","snake girl/attack05.png",)

  crockAnm = loadAnimation("crocky/idle01.png","crocky/idle02.png","crocky/idle07.png");

  gameoverImage = loadImage("go.png");

}

function setup(){
  createCanvas(1200,650);
  
  gino = createSprite(220,590,50,50);
  gino.debug = true;
  gino.addAnimation("idle",heroImg);
  gino.addAnimation("running",gino_running);
  gino.scale = 3;
  gino.setCollider("circle",-5,10,20)
    
  invisibleGround = createSprite(gino.x-200,630,displayWidth,20);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;
  invisibleGround.x=invisibleGround.width/2;

  // bat = createSprite(100,300,50,50);
  // bat.addAnimation("fly",batFly);

    health = createSprite(Math.round(random(100,1300)),
    Math.round(random(100,600),10,10));
    health.addImage(healthImg);
    health.scale = 0.5;

    // digger = createSprite(50,360,50,50);
    // digger.addAnimation("idle",diggerImg);
    // digger.addAnimation("hat",diggerHit);


    // auntbaton = createSprite(290,590,50,50);
    // auntbaton.addImage(auntBatonImg);

    batGroup=new Group();
    digGroup=new Group();
    crockGroup=new Group();
    batonGroup=new Group();
    snakeGroup=new Group();
}




function draw(){
  if(gameState===0){
      background(255);
      textSize(30);
      text("I am the king of palmor, I request you to save ",400,325)
      text("my daughter from Draco, The monster who lives",400,365);
      text("in the forest",400,410);
      text("press S to start",900,500);
      if(keyDown("S")){
        gameState=1;
      }
  }
  if(gameState===1){
    background(bgImg); 
    text("Health:"+ Health,gino.x,30);
    invisibleGround.velocityX=-2;
  if(invisibleGround.x < gino.x){ 
      invisibleGround.x= gino.x-200 ; 
    }
    camera.x=gino.x;
    if(keyDown("RIGHT_ARROW")){
      gino.x+=10;
      gino.changeAnimation("running",gino_running);
    }
    if(keyDown("LEFT_ARROW")){
      gino.x-=10;
    gino.changeAnimation("idle",heroImg);
    }
    
    if(keyDown("space")&& gino.y >= 350) {
          gino.velocityY = -12;
    }

    if(keyDown("F")){
      gino.changeAnimation("throw",throwAnim);
      daggersprt.visible = true;
      daggersprt.velocityX=3;
    }
      batfcn();
      diggerfcn();
      auntbatonfcn();
      snakefcn();
      crockyfcn();
        gino.velocityY = gino.velocityY + 1

        if(Health<0){
        textSize=80;
        }

    if(gino.isTouching(health)){
      Health+=30
      health.destroy();
    }  
    if(gino.isTouching(batonGroup)){
      Health-=30;
      batonGroup.destroyEach();
    }

    if(gino.isTouching(batGroup)){
      Health-=10;
      batGroup.destroyEach();
    }

    if(gino.isTouching(digGroup)){
      Health-=20;
      digGroup.destroyEach();
    }
        if(gino.isTouching(snakeGroup)){
      Health-=40;
      snakeGroup.destroyEach();
    }
        if(gino.isTouching(crockGroup)){
      Health-=25;
      crockGroup.destroyEach();
    }
    if(Health<-140){
      gameState=2;
      gino.destroy();
    }
    gino.collide(invisibleGround);   
}
if (gameState===2){
    background("white");
    gameover = createSprite(600,325,50,50);
    gameover.addImage(gameoverImage);
}
drawSprites();
}

// function spawnVillians(){
//   if(frameCount%60===0){
//       villian=createSprite(600,590,50,50);
//       villian.velocityX=-6;
//       villian.x=(Math.round(random(gino.x-100,gino.x+100)));
//       var rand=Math.round(random(1,3));
//       switch(rand){
//         case 1: villian.addAnimation("fly",batFly);break;

//         case 2: villian.addAnimation("idle",diggerImg);break;

//         //case 3: villian.addImage("label",auntBatonImg);break;

//         // case 4: villian.addAnimation
//     }
//     villianGroup.add(villian);
//   }

function batfcn(){
  if(frameCount%70===0){
  bat1=createSprite(Math.round(random(gino.x-1250,gino.x+1250)),
  Math.round(random(gino.y-100,gino.y+100))
  ,50,50);
  bat1.debug = true;
  bat1.scale = 1.5;
  bat1.addImage(batig);
  bat1.velocityX=-6;
  batGroup.add(bat1);
  bat1.lifetime = 200;
  }
}
function diggerfcn(){
  if(frameCount%50===0){
  digger1 = createSprite(Math.round(random(gino.x-1000,gino.x+1200)),
  Math.round(random(gino.y-200,gino.y+200))
  ,50,50);
  digger1.setCollider("circle",-5,10,20)
  digger1.debug = true;
  digger1.scale = 2;
  digger1.addImage(diggerig);
  digger1.velocityX=-6;
  digGroup.add(digger1);
  digger1.lifetime = 200;
  }
}
function auntbatonfcn(){
  if(frameCount%80===0){
  auntbaton1=createSprite(Math.round(random(gino.x-1150,gino.x+1150)),
  Math.round(random(gino.y-150,gino.y+150))
  ,50,50);
  auntbaton1.setCollider("circle",-5,10,20)
  auntbaton1.debug = true;
  auntbaton1.addImage(auntBatonImg);
  auntbaton1.velocityX=-6;
  batonGroup.add(auntbaton1);
  auntbaton1.lifetime = 200;
  }
}
function snakefcn(){
  if(frameCount%40===0){
  snakegirl=createSprite(Math.round(random(gino.x-1300,gino.x+1300)),
  Math.round(random(gino.y-120,gino.y+120))
  ,50,50);
  snakegirl.setCollider("circle",-5,10,20)
  snakegirl.debug = true;
  snakegirl.addAnimation("sap",snakeAnm);
  snakegirl.velocityX=-6;
  snakeGroup.add(snakegirl);
  snakegirl.lifetime = 200;
  }
}
function crockyfcn(){
  if(frameCount%30===0){
  crocky=createSprite(Math.round(random(gino.x-1510,gino.x+1510)),
  Math.round(random(gino.y-130,gino.y+130))
  ,50,50);
  crocky.setCollider("circle",-5,10,20)
  crocky.debug = true;
  crocky.addAnimation("crock",crockAnm);
  crocky.velocityX=-6;
  crockGroup.add(crocky);
  crocky.lifetime = 200;
  }
}
