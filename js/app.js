class Enemy {
    constructor(sprite='images/enemy-bug.png',x = 0, y = 0, speed = 0){
      this.sprite = sprite;
      this.x = x;
      this.y = y;
      this.speed = speed;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if(this.x >= 490){
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor(sprite = 'images/char-boy.png',x = 0, y = 380, count = 0, life = 5){
     this.sprite = sprite;
     this.x = x;
     this.y = y;
     this.count = count;
     this.life = life;
  }
}

Player.prototype.update = function(){
   this.x = this.x;
   this.y = this.y;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys){
   switch(allowedKeys){
     case "left":
        if(this.x <= 0){
          console.log('Met left wall');
        }else{
          this.x = this.x - 100;
        }
        break;
     case "right":
        if(this.x >= 400){
          console.log('Met right wall');
        }else{
          this.x = this.x + 100;
        }
        break;
     case "up":
        console.log(this.y);
        if(this.y <= 60){
          this.x = 0;
          this.y = 380;
          this.count++;
          document.getElementById('won').innerText = `Games Won: ${this.count}`;
          if(this.count % 5 == 0){
            var star = document.querySelector('.stars');
            star.setAttribute('src','images/Active.png');
            star.setAttribute('class','stars-active');
            firstEnemy.speed += 15;
            secondEnemy.speed += 10;
            thirdEnemy.speed += 5;
          }
          if(this.count == 30){
          setCongratulations();
          }
        }else{
          this.y = this.y - 80;
        }
        break;
     case "down":
        if(this.y >= 380){
          console.log('Met down wall');
        }else{
          this.y = this.y + 80;
        }
        break;
   }
};

var firstEnemy = new Enemy('images/enemy-bug.png',0,230,getRandomArbitrary(50, 100));
var secondEnemy = new Enemy('images/enemy-bug.png',0,150,getRandomArbitrary(100, 200));
var thirdEnemy = new Enemy('images/enemy-bug.png',0,60,getRandomArbitrary(200, 300));

var player = new Player();
var flag = true;

function checkCollisions(){
  if(player.life <= 0 && flag){
     flag = false;
     setGameOver();
  }
  var enamies = [firstEnemy,secondEnemy,thirdEnemy];
  checkCollisionForEachEnemy(enamies,player);
}

// Once all lifes is gone this method will make visible Game Over section with amount of stars
function setGameOver(){
  document.querySelector('#message').innerText = 'GAME OVER';
  var activeStars = document.querySelectorAll('.stars-active');
  var faStars = document.querySelectorAll('.fa-star');
  for(var i = 0; i < activeStars.length; i++){
    faStars[i].setAttribute('class','fa fa-star-o');
  }
  document.querySelector('#win-alert').setAttribute('style','');
}
// Once all stars in on this method will make visible Congrats section
function setCongratulations(){
  var faStars = document.querySelectorAll('.fa-star');
  for(var i = 0; i < faStars.length; i++){
    faStars[i].setAttribute('class','fa fa-star-o');
  }
  document.querySelector('#win-alert').setAttribute('style','');
}

var allEnemies = [firstEnemy,secondEnemy,thirdEnemy];
var player = player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This method will change personaje in the game
function changePersonaje(){
  var selectTag = document.querySelector('#select-personaje');
  player.sprite = choosePersonaje(selectTag.value);
  selectTag.disabled = true;
  selectTag.setAttribute('style','color:cadetblue');
}

function choosePersonaje(personaje){
  switch(personaje){
    case 'boy':
      return 'images/char-boy.png';
    case 'cat-girl':
      return 'images/char-cat-girl.png';
    case 'horn-girl':
      return 'images/char-horn-girl.png';
    case 'pink-girl':
      return 'images/char-pink-girl.png';
    case 'princess-girl':
      return 'images/char-princess-girl.png';
  }
}

// This method is used to get random speed in some given range
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// This method is used to check collision between each Enamy and Player
function checkCollisionForEachEnemy(enamies,player){
  for(val of enamies){
    if(findDifferance(val.x, player.x,72) && findDifferance(val.y, player.y,50)){
      player.x = 0;
      player.y = 380;
      removeLife();
      player.life--;
    }
  }
}

function removeLife(){
  var lifes = document.querySelectorAll('.hearts');
  lifes[lifes.length -1].setAttribute('style','display:none');
  lifes[lifes.length -1].setAttribute('class','inactiveLife');
}

// This method is used to find difference of distance between two objects
// Since we are using img in UI we for x and y collisions are going to be different
function findDifferance(x, y,distance){
    if(Math.abs(x - y) <= distance){
      return true;
    }else{
      return false;
    }
}

// This method is used to make choose personaje dropdown list available
// It got disabled after picking personaje because right away Player will start navigating using 'up', 'down'
// and etc. Since browser has focus on select tag. It will change personajes

function makeAbleChange(){
  var selectTag = document.querySelector('#select-personaje');
    selectTag.disabled = false;
    selectTag.setAttribute('style','#fff');
}

function startNewGame(){
  window.location.reload(false);
}
