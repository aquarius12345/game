window.onload = () => {
  document.getElementById('start-btn').onclick = () => {
    startGame();
  };

  //..............Unicorn keyboard........................
  document.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'ArrowLeft':
        unicorn.moveLeft();
        break;
      case 'ArrowRight':
        unicorn.moveRight();
        break;
      case 'ArrowUp':
        unicorn.moveUp();
        break;
      case 'ArrowDown':
        unicorn.moveDown();
    }
  });


  //...................Start...............................
  function startGame() {
    const music = new Audio("./bensound-littleidea.mp3");
    music.play();
    updateCanvas();  
    
  }
 //........................................................
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  let animationId = null;
  let frames = 0;
  let score = 0;

  function updateCanvas() {
    frames += 1;
    showScore();
    clearCanvas();
    background.draw();
    unicorn.draw();

    // const crashCupcake = updateCupcakes();
    // if(crashCupcake){
    //   score += 1;
    // }

    updateCupcakes();
    updatePoisons();
    animationId = requestAnimationFrame(updateCanvas); 
  }
  //...................Clear.................................
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //.................Show Score..............................
  function showScore() {
    scoreElement.innerHTML = score;
  }
  //.................Stop Game...............................
  function stopGame() {
    cancelAnimationFrame(animationId);
  }
  //.................Game Over...............................
  function gameOver() {
    ctx.fillStyle = 'violet';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'pink';
    ctx.font = '100px Arial'
    ctx.fillText('GAME OVER', 250, 200);
  }

  //.................Background..............................
  class Background {
    constructor(source) {
      this.posX = 0;
      this.posY = 0;

      const img = new Image();
      img.src = source;

      img.onload = () => {
        this.img = img;
      };
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, canvas.width, 450);
    }
  }
  const background = new Background("./images/blueSky.png");

  //.....................Unicorn..................................
  class Unicorn {
    constructor(source, x, y, w, h){
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.speed = 50;

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      }
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    moveLeft() {
      if(this.posX > 20){
        this.posX -= this.speed;
      }
      
    }

    moveRight() {
      if(this.posX < 450){
        this.posX += this.speed;
      } 
    }

    moveUp() {
      if(this.posY > 20){
        this.posY -= this.speed;
      } 
    }

    moveDown() {
      if(this.posY < 300){
        this.posY += this.speed;
      } 
    }
    
    top() {
      this.posY;
    }

    bottom() {
      this.posY + this.height;
    }

    left() {
      this.posX;
    }

    right() {
      this.posX + this.width;
    }

    checkCollision(obstacle) {
      return !(
        this.top() > obstacle.bottom() ||
        this.bottom() < obstacle.top() ||
        this.left() > obstacle.right() ||
        this.right() < obstacle.left()
      );
    }
  }
  const unicorn = new Unicorn("./images/unicorn.png", 220, 300, 130, 100);

  //.....................Cupcakes.................................
  class Obstacle {
    constructor(source, x, y, w, h, s){
      this.posX = x;
      this.posY = 0;
      this.width = w;
      this.height = h;
      this.speed = s;

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      }
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    move() {
      this.posY += this.speed;
    }

    top() {
      this.posY;
    }

    bottom() {
      this.posY + this.height;
    }

    left() {
      this.posX;
    }

    right() {
      this.posX + this.width;
    }
  }

  const cupcakes = [];

  function createCupcake() {
    const posX = Math.floor(Math.random()*400) + 20;
    //const posY = Math.floor(Math.random()*canvas.height);
    
    // const cupcake = new Obstacle("./images/cupcake.png", posX, posY, 60, 60);
    // cupcakes.push(cupcake);
    cupcakes.push(new Obstacle("./images/cupcake.png", posX, this.posY, 60, 60, 3)); 
    cupcakes.push(new Obstacle("./images/cupcake.png", posX, this.posY, 60, 60, 3)); 
  }

  function updateCupcakes() {
    for(let i = 0; i < cupcakes.length; i += 1) {
      cupcakes[i].move();
      cupcakes[i].draw();
      if(cupcakes[i] > canvas.height){
        cupcakes.shift();
      }
      // if(unicorn.checkCollision(cupcakes[i])){
      //   return true;
      // }
    }
    if(frames % 60 === 0) {
      createCupcake();
    }
  }

  //......................Poison...................................
  const poisonBottles = [];

  function createPoison() {
    const posX = Math.floor(Math.random()*300) + 30;
  
    poisonBottles.push(new Obstacle("./images/poison.png", posX, this.posY, 60, 60, 2));  
  }

  function updatePoisons() {
    for(let i = 0; i < poisonBottles.length; i += 1) {
      poisonBottles[i].move();
      poisonBottles[i].draw();
      if(poisonBottles[i] > canvas.height){
        poisonBottles.shift();
      }
      // if(unicorn.checkCollisionCupcake(poisonBottles[i])){
      //   return score-=1;
      // }
    }
    if(frames % 300 === 0) {
      createPoison();
    }
  }

}