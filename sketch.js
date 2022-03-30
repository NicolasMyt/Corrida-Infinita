var Cenario_velocityX = 0
var Ground;
var Player;
var PlayerMask;
var SensorJump;
var IsGround;
var GameState = "Play";

var SensorTop;
var score = 0;
var Power= 0;
var PowerMax = 0;
var EnemyRandom = 0;
var Cloud;
var Cloud2;

var FireBall;
var FireBallPress = 0;

var DeadTime;
var InvisibleTime = 0;

var Mushroom;


function preload(){
  //Carregar animações do Mario
  MarioIdle = loadImage("MarioSprites/Idle/MarioIdle.png")
  MarioWalk = loadAnimation("MarioSprites/Walking/MarioWalk1.png","MarioSprites/Walking/MarioWalk2.png","MarioSprites/Walking/MarioWalk3.png","MarioSprites/Walking/MarioWalk2.png")
  MarioJump = loadImage("MarioSprites/Jump/MarioJump.png");
  MarioDied = loadImage("MarioSprites/Dead/MarioDied.png");

  BigMarioWalk = loadAnimation("MarioSprites/BigMario/BigMarioWalk.png","MarioSprites/BigMario/BigMarioWalk2.png","MarioSprites/BigMario/BigMarioWalk3.png","MarioSprites/BigMario/BigMarioWalk2.png")
  BigMarioJump = loadImage("MarioSprites/Jump/BigMarioJump.png");

  FireMarioWalk = loadAnimation("MarioSprites/BigMario/FireMarioWalk1.png","MarioSprites/BigMario/FireMarioWalk2.png","MarioSprites/BigMario/FireMarioWalk3.png","MarioSprites/BigMario/FireMarioWalk2.png");
  FireMarioJump = loadImage("MarioSprites/Jump/FireMarioJump.png");


  //Carregar Imagem do chão 
  GroundImage = loadImage("ObjectsSprites/Ground1.png");

  //Carregar Imagem das Nuvens
  CloudImage = loadImage("ObjectsSprites/Nuvem1.png");
  CloudImage2 = loadImage("ObjectsSprites/Nuvem2.png");

  //Carregar Animações dos Inimigos
  GoombaWalk = loadAnimation("EnemiesSprites/Goomba1.png","EnemiesSprites/Goomba2.png")
  GoombaCrushed = loadImage("EnemiesSprites/GoombaCrushed.png")
  
  KoopaWalk = loadAnimation("EnemiesSprites/Koopa1.png","EnemiesSprites/Koopa2.png")
  KoopaCrushed = loadImage("EnemiesSprites/KoopaCrushed.png")


  //Carregar Objetos
  MushroomImage = loadImage("ObjectsSprites/Mushroom.png")
  
  FireFlowerImage = loadAnimation("ObjectsSprites/FireFlower/FireFlower1.png","ObjectsSprites/FireFlower/FireFlower2.png","ObjectsSprites/FireFlower/FireFlower3.png","ObjectsSprites/FireFlower/FireFlower4.png");

  Fire = loadImage("ObjectsSprites/Fire.png");

  //Carregar Sons
  JumpSoundSmall = loadSound("MarioSounds/smb_jump-small.wav");
  Power_UP = loadSound("MarioSounds/smb_powerup.wav");
  StompSound = loadSound("MarioSounds/smb_stomp.wav");
  DeathSound = loadSound("MarioSounds/smb_mariodie.wav");
  PowerDownSound = loadSound("MarioSounds/smb_pipe.wav");
  FireBallSound = loadSound("MarioSounds/smb_fireball.wav")


  //Carregar Música

StageMusic = loadSound("Music/Super Mario Galaxy - Fight to the Death at Koopa's Fort.mp3");


}

function setup() {

  noCursor();
  createCanvas(1000,600);

  frameRate(60);
  

  Mushroom = createSprite;

  FireBall = createSprite;


  //Criar o sensor principal
  PlayerMask = createSprite(200,400,16,18);
  PlayerMask.visible = false;
  


  //Criar o Mario e adicionar as animações
  Player = createSprite(PlayerMask.x,PlayerMask.y)
  Player.addImage("Idle",MarioIdle);
  Player.addImage("Jump",MarioJump);
  Player.addImage("BigJump",BigMarioJump);
  Player.addImage("Died",MarioDied);
  
  Player.addAnimation("Walking",MarioWalk);
  Player.addAnimation("BigWalk",BigMarioWalk);

  Player.addAnimation("FireWalk",FireMarioWalk);
  Player.addImage("FireJump",FireMarioJump);

 
  

  //Criando o Sensor
  SensorJump = createSprite(PlayerMask.x,PlayerMask.y,16,1);
  SensorJump.shapeColor = "blue"
  SensorJump.visible = false;

  SensorTop = createSprite(Player.x,PlayerMask.y,16,1);
  SensorTop.shapeColor = "yellow";
  SensorTop.visible = false;

  Ground = createSprite(500,height - 200,500,10);
  Ground.addAnimation("Ground",GroundImage);


  //Adicionar animações aos inimigos
  Goomba = createSprite();
  Goomba.addAnimation("Walk",GoombaWalk);
  Goomba.addImage("Crushed",GoombaCrushed);


  Koopa = createSprite();
  Koopa.addAnimation("Walk",KoopaWalk);
  Koopa.addImage("Crushed",KoopaCrushed);
 

  

  
}

function draw(){
  background(0);
 //Adicionar Texto da pontuação
 text("Score = " + score,10,50);

 //Arrumando Posição dos Sensores
  SensorJump.x = PlayerMask.x
  SensorJump.y = PlayerMask.y + 12
  SensorTop.x = PlayerMask.x

  SensorTop.y = PlayerMask.y - 7

  //Adicionado Gravidade ao Jogador

  if( PlayerMask.velocityY < 5 && GameState != "GameOver"){
   
    PlayerMask.velocityY = PlayerMask.velocityY + 0.25
  }

   

  //Detectando se o Player está no chão

  if(!SensorJump.isTouching(Ground)){
    IsGround = false;
  }

  if(SensorJump.isTouching(Ground) && PlayerMask.velocityY >= 0){
    IsGround = true;
  }

 //Animações
 if(GameState != "GameOver"){
   Player.x = PlayerMask.x
   Player.y = PlayerMask.y - 7  
 }
 

  if(GameState != "GameOver" && Cenario_velocityX == 0){

    Player.changeImage("Idle",MarioIdle);
  }

  if(GameState != "GameOver" && IsGround == true && Cenario_velocityX < 0){
    if(Power == 0){
      Player.changeAnimation("Walking",MarioWalk);
    }
    if(Power == 1){
      Player.changeAnimation("BigWalk",BigMarioWalk);
    }

    if(Power >= 2){
      Player.changeAnimation("FireWalk",FireMarioWalk);
    }
    
    
  }

  if(GameState != "GameOver" && IsGround == false){
    if(Power == 0){
      Player.changeImage("Jump",MarioJump);
    }

    if(Power == 1){
      Player.changeImage("BigJump",BigMarioJump);
    }
    if(Power == 2){
      Player.changeImage("FireJump",FireMarioJump);
    }
    
  }

  if(GameState == "Play" && keyDown("ENTER") && Cenario_velocityX == 0){
    GameState = "Playing";
    Cenario_velocityX = -2
  }




  //Poderes
   //Bola de fogo

  if(keyDown("x") && FireBallPress == 0){

    FireBall = createSprite(Player.x,Player.y);
    FireBall.addImage("FireBall",Fire)
    
    FireBall.velocityX = Cenario_velocityX *-1
    FireBall.life = 200/(Cenario_velocityX - 2 * -1)
    FireBallPress = 1
    FireBallSound.play();
  }

  if(!keyDown("x")){
    FireBallPress = 0;
  }


//Invisibilidade

if(InvisibleTime >0){
  InvisibleTime -= 1
  Player.opacity = 1
}
if(InvisibleTime == 0){
  Player.opacity = 250
}

 
  //Fazer o jogador pular
    if(GameState != "GameOver" && keyDown("Space") || GameState != "GameOver" && keyDown(UP_ARROW) || GameState != "GameOver" && keyDown("z")){
      if(IsGround == true && PlayerMask.velocityY >= 0){

        PlayerMask.velocityY = -5;
        JumpSoundSmall.play();
        IsGround = false;
      }
    }
    
    if(GameState != "GameOver" && !keyDown("Space") && !keyDown(UP_ARROW) && !keyDown("Z") && PlayerMask.velocityY < -2){
      PlayerMask.velocityY = -2
    }


  //Modo de jogo
  if(GameState == "Playing"){
    //Adicionar Pontos
    score = score + Math.round(frameCount & 2);

   //Fazer o cenario se mover
   Cenario_velocityX = -1 - floor(score / 300);

   

    //criar inimigos
    if(frameCount % 50 == 0){

    EnemyRandom = Math.round(random(1,2))
    }

    if(EnemyRandom == 1){
      Goomba = createSprite(1016,Ground.y - 55);
      Goomba.addAnimation("Walk",GoombaWalk);
      Goomba.addImage("Crushed",GoombaCrushed);
      Goomba.velocityX = Cenario_velocityX -2
      Goomba.life = width

      EnemyRandom = 0;
    }
    if(EnemyRandom == 2){
      Koopa = createSprite(1016,Ground.y - 58)
      Koopa.addAnimation("Walk",KoopaWalk);
      Koopa.addImage("Crushed",KoopaCrushed);
      Koopa.velocityX = Cenario_velocityX -2
      Koopa.life = width

      EnemyRandom = 0;
    }
  }

  //Fisicas do Game Over
  if(PlayerMask.isTouching(Goomba) && GameState != "GameOver" && InvisibleTime == 0 || PlayerMask.isTouching(Koopa) && GameState != "GameOver" && InvisibleTime == 0){
    if(Power == 0){
      GameState = "GameOver"
      DeadTime = 1;
      Cenario_velocityX = 0
      Player.changeImage("Died",MarioDied);
      DeathSound.play();
    } 
    if(Power > 0){
      Power -= 1
      InvisibleTime = 100;
      PowerDownSound.play();
    }
  }




  if(DeadTime > 0 && DeadTime <100){
    DeadTime += 1;
  }

  if(DeadTime == 40){
    Player.velocityY = -5
  }

  if(DeadTime >= 41){
    Player.velocityY = Player.velocityY + 0.25
    Player.depth = Ground.depth + 1
  }

  
  if(DeadTime == 100){
    text("Tentar de novo?  Pressione Enter.",200,200)
    if(keyDown("ENTER")){
      reset();
    }
  }
    
 //Dar power up ao jogar quando chegar a tal pontuação
 if(score % 1000 == 499){
  Power += 1
  Power_UP.play();
  InvisibleTime = 100
  Mushroom = createSprite(PlayerMask.x,PlayerMask.y)
  Mushroom.addImage("MushroomUp",MushroomImage)
  Mushroom.velocityY = -5
  Mushroom.depth = Player.depth - 1
  Mushroom.life = 80;
 }

  //Efeito do Cogumelo
  if(Mushroom.velocityY < 0){
    Mushroom.velocityY = Mushroom.velocityY + 0.15
  }

  //fazer o ceneraio "Infinito"
  Ground.velocityX = Cenario_velocityX;

  if(Ground.x < 334){
    Ground.x = 500;
  }
  
  if(PlayerMask.velocityY >=0){
    PlayerMask.collide(Ground);
  }



console.log(floor(score/500))
  drawSprites();
}


function reset(){
  Goomba.remove();
  Koopa.remove();
  DeadTime = 0;
  score = 0;
  GameState = "Play"
}