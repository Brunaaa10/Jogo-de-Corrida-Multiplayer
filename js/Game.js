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

    fuels = new Group();
    coins = new Group();

    this.addSprites(fuels, 4, fuelImg, 0.02);
    this.addSprites(coins, 18, coinImg, 0.09);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImg, scale){
    for(var i = 0; i < numberOfSprites; i ++){
      let x, y;
      x = random(width/2 + 150, width/2 - 150);
      y = random(- height * 4.5, height - 400);

      var sprite = createSprite(x,y);
      sprite.addImage(spriteImg);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
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
    Player.getPlayersInfo();

    if(allPlayers != undefined){
      image(track, 0,-height * 5, width, height * 6);
      this.handlePlayerControls();

      var index = 0;

      for(var plr in allPlayers){
        index ++
        var x = allPlayers[plr].positionX
        var y = height - allPlayers[plr].positionY

        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        if(index == player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          camera.position.y = cars[index - 1].position.y;
          // camera.position.x = cars[index - 1].position.x

          this.handleFuel(index);
          this.handleCoins(index);
        }
      }

      drawSprites();
    }
   }

   handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW)){
      player.positionX += 5
      player.update();
    }

    if(keyIsDown(LEFT_ARROW)){
      player.positionX -= 5
      player.update();
    }

   }


   handleFuel(index){
    cars[index - 1].overlap(fuels, function (collector, collected){
      player.fuel = 185
      collected.remove();
    });
   }

   handleCoins(index){
    cars[index - 1].overlap(coins, function (collector, collected){
      player.score += 21;
      player.update();
      collected.remove();
    })
   }

}
