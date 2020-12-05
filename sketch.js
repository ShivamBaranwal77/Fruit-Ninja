//game states
var PLAY=1;
var END=0;
var gameState=1;

//creating sprites
var score;
var sword, swordImage;
var fruitGroup, fruit1, fruit2, fruit3, fruit4;
var alienGroup, alien1, alien2, alienImage;
var gameOver, gameOverImage;
var knifeSwooshSound, gameover;


function preload(){
  
  swordImage = loadImage("sword.png");
   
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  alienImage = loadAnimation("alien1.png","alien2.png")
  
  gameOverImage = loadImage("gameover.png")
  
  gameover = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}


function setup(){
  createCanvas(600,450);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage("sword",swordImage);
   sword.scale=0.7
  
  //move sword with mouse
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  
  //Settting collider
  sword.setCollider("rectangle",0,0,40,40);
  
  //score variables and group
  score = 0;
  fruitGroup = createGroup();
  alienGroup = createGroup();
  
  //creating game over sprite and adding image
  gameOver = createSprite(280,80);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale=0.5
  gameOver.visible = false;
}

function draw(){
  background("lightblue");
  
  //adding text (score)
  text("Score: "+ score, 500,50);
  
  // adding scores and increasing the score also adding sound when sword is touching fruit
  if (sword.isTouching (fruitGroup)){
    fruitGroup.destroyEach();
    
    knifeSwooshSound.play();
    score = score+2
  }
  
  // making the game to end state
  if (sword.isTouching (alienGroup)){
    sword.destroy();
    alienGroup.destroyEach();
    
    gameover.play();
    gameState = END;
  }
  
  
  
  if(gameState === PLAY){
  
  //Call fruits and Enemy functions
  fruits();
  Enemy();
   
   //moving the sword with mouse
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  }
  

  
  else if(gameState === END){
     gameOver.visible = true;
     
    // making the speed of sword 0
     sword.y=0;
     sword.x=0;
    
    //changing theimage of the sword to gameOver and making the reset position
     sword.changeImage(gameOverImage);
     sword.x=200;
     sword.y=200;
    
    //Set velocity X for both the groups to 0
     fruitGroup.setVelocityXEach(0);
     alienGroup.setVelocityXEach(0);
    
    //making fruit and enemy disappper when game overs
     fruitGroup.setLifetimeEach(0);
     alienGroup.setLifetimeEach(0);
     }
  
  
  drawSprites();
}

function fruits(){
  if (World.frameCount%80===0){
     fruit=createSprite(400,200,20,20);
     position = Math.round(random(1,2));

     fruit.scale=0.2;
      r=Math.round(random(1,4));
     if (r == 1){
       fruit.addImage(fruit1);
     } else if (r == 2){
       fruit.addImage(fruit2);
     } else if (r == 3){
       fruit.addImage(fruit3);
     } else if (r == 4){
       fruit.addImage(fruit4);
     }
    
     fruit.y = Math.round(random(50,340));
    
    if(position == 1){
      fruit.x = 400;
      fruit.velocityX=-(7+(score/4));
       }
    else
      {
    if(position == 2)
      fruit.x = 0;
      fruit.velocityX=(7+(score/4));
      }
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
   }
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",alienImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    alienGroup.add(monster);
   }
}