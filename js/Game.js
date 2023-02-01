class Game {
  constructor() {
    
  }

  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();

    car1 = createSprite(width/2 - 50, height - 100);
    car1.addImage("car1", car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 + 100, height - 100);
    car2.addImage("car2", car2Img);
    car2.scale = 0.07;

    cars = [car1,car2]
  }

   handleElements(){
    form.titleImg.class("gameTitleAfterEffects");
    form.hide();
  }

  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", data =>{
      gameState = data.val();
    })
  }

  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }

   play(){
    this.handleElements();

    image(track, 0,-height * 5, width, height * 6);

    drawSprites();
   }

}
