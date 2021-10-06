const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con,fruit_con_2;

var bg_img,food,rabbit,bunny,button;

//Declare variable to load blink,eating and sad animation
var blink, eating, sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
  //load blink,eat & sad Animation
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eating = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  //Enable the play mode of the animation 
  blink.playing=true;
  eating.playing=true;
  sad.playing=true;
  //write code to  stop the continuous play mode of the animation
  sad.looping=false;
  eating.looping=false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  //To slow the speed of the animation we need to set a frameDelay
  blink.frameDelay=20;
  eating.frameDelay=20;
  sad.frameDelay=20;
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

 //Add different Animation of Bunny
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eating);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');


  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  //Write code to  ensure to show fruit body only if it exists
  if(fruit!=null)
  {
   image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  //Write to code to check whether the fruit is colliding with bunny or not
  //if fruit is colliding with bunny than change the animation to eating
 if(collide(fruit,bunny)==true){
   bunny.changeAnimation('eating')
 }
  //Write to code to check whether the fruit is colliding with ground or not
  //if fruit is colliding with ground than change the animation to crying
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation('crying')
  }

  drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//Declare collide function
function collide(body,sprite)
{
  if(body!=null)
  {
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80)
    {
      World.remove(engine.world,fruit);
      fruit=null;
      return true;
    }
    else 
    {
      return false;
    }
  }
}
