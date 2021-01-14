var sword, swordImage;
var fruitGroup, enemyGroup;
var fruit, fruitImage;

//gameStates
var PLAY = 1;
var END = 1;
var gameState =PLAY;

var score = 1;
var monster, monsterImage;
var fruit1, fruit2, fruit3, fruit4;

var gameOverImage;

function preload(){
swordImage = loadImage("sword.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
monsterImage = loadAnimation("alien1.png", "alien2.png");
gameOverImage = loadImage("gameover.png"); 
}

function setup(){
 createCanvas(400, 400);
  
  //creating sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  //creating fruit and enemy groups
  fruitGroup= createGroup();
  enemyGroup= createGroup();
  
  text("Score:"+score,50,70);
}

function draw(){
  background("white");
  
  
  //Calling functions
  enemy();
  fruits();
  
  if(gameState == PLAY){
    //Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
  if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     score=score+1;
  }  
}
  
  if(gameState == END){
    if(enemyGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      
      fruitGroup.setVelocityX=0;
      enemyGroup.setVelocityX=0;
      
      //Change the animation of sword to gameOver & reset its position
      sword.addImage(gameOverImage);
      sword.y = 200;
      sword.x = 200;
    }
  }
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400, 200,20, 20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else {
      fruit.addImage(fruit4); 
    }
    
    fruit.y=Math.round(random(50, 340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
  
}

function enemy(){
  if(World.frameCount%200==0){
    monster=createSprite(400, 200, 20, 20);
    monster.addImage("moving", monsterImage);
    monster.y=Math.round(random(100, 300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}




