var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player,game;
var playerCount,gameState;
var track, car1Img, car2Img;
var car1, car2;
var cars = []
var allPlayers;
var coinImg, fuelImg;
var coins, fuels;
var lifeImage;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  track = loadImage("./assets/track.jpg");
  car1Img = loadImage("./assets/car1.png");
  car2Img = loadImage("./assets/car2.png");

  coinImg = loadImage("./assets/goldCoin.png");
  fuelImg = loadImage("./assets/fuel.png");
  lifeImage = loadImage("./assets/life.png");
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();

  game.getState();

}

function draw() {
  background(backgroundImage);

  if(playerCount == 2){
    game.updateState(1);
  }

  if(gameState == 1){
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
