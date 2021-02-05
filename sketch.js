const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var database;
var balloon;
var balloonimg1,balloonimg2,balloonimg3,balloonimg4;
var backgroundimg;

function preload(){
  backgroundimg = loadImage("background.png");
  balloonimg1 = loadImage("balloon1.png");
  balloonimg2 = loadImage("balloon2.png");
  balloonimg3 = loadImage("balloon3.png");

}

function setup(){
  database = firebase.database();
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  balloon = createSprite(200,400,20,20);
  balloon.addAnimation("balloon1.png",balloonimg1);
  balloon.scale = 0.5;
 
}

function draw(){
  background(backgroundimg);

  textSize(22);
  stroke(22);
  text("**Use " + "arrow " + "keys " + "to " + "move " + "Hot " + "Air " + "Balloon!",80,80);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("balloon2.png",balloonimg2);
    balloon.scale = balloon.scale -0.01;
  }

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);

  drawSprites();
}

function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x' : updateHeight.x + x,
     'y' : updateHeight.y + y
   });
}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}