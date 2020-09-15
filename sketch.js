var tower,towerImage,door,doorImage,doorGroup
var climber,climberImage,climberGroup
var ghost,ghostImage
var ibGroup
var gameState='play'
var spookysound

function preload(){
 towerImage=loadImage('tower.png')
 doorImage=loadImage('door.png')
 climberImage=loadImage ('climber.png')
 ghostImage=loadImage('ghost-standing.png')
 spookysound=loadSound('spooky.wav') 
}



function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.4
  
  spookysound.loop();
  
  doorGroup= new Group();
  climberGroup= new Group();
  ibGroup=new Group();

}

function spawnDoors(){
if(frameCount%99==0){
 var door=createSprite(200,-50)
 door.addImage(doorImage)
 door.x=Math.round(random(120,400))
 door.velocityY=2
 door.lifetime=350
 doorGroup.add(door)
  
 var climber=createSprite(200,10)
 climber.addImage(climberImage)
 climber.velocityY=2
 climber.x=door.x
 climber.lifetime=350
 climber.debug=true
 climberGroup.add(climber)
  
  var invisibleblock=createSprite(200,15)
  invisibleblock.width=climber.width
  invisibleblock.height=2
  invisibleblock.x=door.x
  invisibleblock.velocityY=2
  invisibleblock.debug=true
  ibGroup.add(invisibleblock);
  
  ghost.depth=door.depth
  ghost.depth=ghost.depth+1
  
}
}


function draw(){
 background(0);
  if(gameState==='play'){
    
  if(tower.y>400){
    tower.y=300
}
  if(keyDown('left')){
    ghost.x=ghost.x-3
  }
  
   if(keyDown('right')){
    ghost.x=ghost.x+3
  }
   if(keyDown('space')){
    ghost.velocityY=-5
  }
  if(climberGroup.isTouching(ghost)){
   ghost.velocityY=0
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(ibGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState='end'
  }
 
 spawnDoors(); 
  
  drawSprites();
}
  if(gameState==='end'){
    stroke('blue');
    //fill('yellow');
    textSize(30);
    text('GAME OVER',230,250);
  }
}