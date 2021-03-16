const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body= Matter.Body;
const Cons = Matter.Constraint;

var engine, world;

var stone,ground,bgImg,monkey,monkeyImage,monkeyStop;
var banana,banana1,banana2,banana3,banana4,banana5;

var Position, database;

function preload(){

  bgImg=loadImage("images/jungle.jpg");
  monkeyImage=loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  monkeyStop=loadAnimation("images/Monkey_08.png")

}

function setup(){
  
  database = firebase.database();

  var canvas = createCanvas(1200,650);
  engine = Engine.create();
  world = engine.world;

  monkey=createSprite(50,600,20,20);
  monkey.addAnimation("Running",monkeyImage);
  monkey.addAnimation("Stop",monkeyStop);
  monkey.scale=0.15;

  ground = new Ground(600,height,2000,20);

  //stone= new Stone(800,550);

  banana=new Banana(800,325);
  banana1=new Banana(900,325);
  banana2=new Banana(1000,325);
  banana3=new Banana(1100,325);
  banana4=new Banana(1200,325);
  banana5=new Banana(1300,325);

  var monkeyPosition=database.ref('Monkey/Position');
  monkeyPosition.on("value",readPosition,showError);
}

function draw(){

  background(bgImg);
  Engine.update(engine);

  //stone.display();
  ground.display();
  banana.display();
  banana1.display();
  banana2.display();
  banana3.display();
  banana4.display();
  banana5.display();

  if (Position!==undefined){
    if(keyDown(LEFT_ARROW)){
            writePosition(-3,0);
            camera.position.x=monkey.x;
            //camera.position.y=monkey.y;
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
        camera.position.x=monkey.x;
       //camera.position.y=monkey.y;
    }
    else if(keyDown(UP_ARROW)){
      monkey.velocityY=-10;
    }
    else if(keyDown(DOWN_ARROW)){
      monkey.velocityY=+10;
    }
  }

    drawSprites();

    if(monkey.x>=1560){
      monkey.x=1560;
      camera.position.x=monkey.x;
      monkey.changeAnimation("Stop",monkeyStop);
      textSize(25);
      fill("black");
      text("Game Over!!!",600,325);
      noFill();
    }
}

function readPosition(data){
  Position=data.val();
  monkey.x=Position.X;
  monkey.y=Position.Y;
}

function writePosition(X,Y){
  database.ref('Monkey/Position').set({
      'X': Position.X+X,
      'Y': Position.Y+Y
  })

}

function showError(){
  console.log("Error in writing to the database");
}
