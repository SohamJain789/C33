const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    //To avoid the bird reset back while it is still moving 
    if(keyCode === 32  && bird.body.speed<1){
       //Empty the array to remove multiple trajectories 
       //Empty trajectory means there will be no bird positions where we can attach the smoke image 
       bird.trajectory = [];
       //Reset the position of the bird near to the slingshot so that it does not swing rapidly 
       Matter.Body.setPosition(bird.body, {x:200,y:50}); 
       slingshot.attach(bird.body);

    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

//Debugging tips and tricks 
//1 == DO not panic on seeing bugs 
//2 == Check console log for the errors (Ctrl + Shift + J) == Tells us what happened,in which file and the line number 
//3 == If there are no errors in the console log use the following techniques 
//3.1 == Comment sections of your code to narrow down the search to the part of code which causes errors 
//3.2 == Print values of some critical variables 
//3.3 == Try print messages in if and else blocks 
//3.4 === Combination of 3.1,3.2,3.3 
//4 == Most common errors 
//4.1 == Typos == accidentally misspelled names of variables and object and functions 
//4.2 == Incorrect use of funcions 
//4.3 == Using vars out of their scope 
//5 == Precautions to minimise  time of debugging 
//5.1 == Write functions == Modular programming
//5.2 == Format or indent the code properly
//5.3 == Add proper comments 
//5.4 == Give proper names to vars and objects and functions 



