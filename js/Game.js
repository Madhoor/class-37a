class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

 async start(){
    if(gameState === 0){
      player = new Player();
      var playercountref = await database.ref("playerCount").once("value");
        if(playercountref.exists()){
           playerCount = playercountref.val();
           player.getCount(); 
          } 
      
      // player.getCount();
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(15);
    text("Game Started",120,100);
    Player.getplayerinfo();
    if(allplayers != undefined){
      var dp = 130;
      for(var i in allplayers){
      dp = dp + 20;
      textSize(10);
      text(allplayers[i].name + ":" + allplayers[i].distance,120,dp );
      }
    }
    if(keyIsDown(UP_ARROW) && player.index != null ){
      player.distance += 50;
      player.update();
    }
  }
}
