var stage, player;

var shootHeld;                      //is the user holding a shoot command
var lfHeld;                         //is the user holding a turn left command
var rtHeld;                         //is the user holding a turn right command
var upHeld;                         //is the user holding an up command
var downHeld;                         //is the user holding a down command

var alive;							//is player alive?

var WALK_FACTOR = 100;               //how far the player walks per frame

var KEYCODE_ENTER = 13;                //usefull keycode
var KEYCODE_SPACE = 32;                //usefull keycode
var KEYCODE_UP = 38;                //usefull keycode
var KEYCODE_DOWN = 40;		//usefull keycode
var KEYCODE_LEFT = 37;                //usefull keycode
var KEYCODE_RIGHT = 39;                //usefull keycode
var KEYCODE_W = 87;                        //usefull keycode
var KEYCODE_A = 65;                        //usefull keycode
var KEYCODE_D = 68;                        //usefull keycode
var KEYCODE_S = 83;                        //usefull keycode

function init() {
	// code here.
	
	//player = new Player();
		
	alive = true;	//start alive
	stage = new createjs.Stage("demoCanvas");
	
	preload();	//preload creates the player at the end
	
	//demo button
	var btn1 = stage.addChild(new Button("Hello world!", "#f00"));
	btn1.x = 20;
	btn1.y = 20;
		
	//register key functions
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;

	//allow for WASD and arrow control scheme
	function handleKeyDown(e) {
			//cross browser issues exist
			if(!e){ var e = window.event; }
			switch(e.keyCode) {
					case KEYCODE_SPACE:    shootHeld = true; return false;
					case KEYCODE_A:
					case KEYCODE_LEFT:     lfHeld = true; return false;
					case KEYCODE_D:
					case KEYCODE_RIGHT:    rtHeld = true; return false;
					case KEYCODE_W:
					case KEYCODE_UP:       upHeld = true; return false;
					case KEYCODE_S: 
					case KEYCODE_DOWN:     downHeld = true; return false;					
					case KEYCODE_ENTER:    if(canvas.onclick == handleClick){ handleClick(); }return false;
			}
	}

	function handleKeyUp(e) {
			//cross browser issues exist 
			if(!e){ var e = window.event; }
			switch(e.keyCode) {
					case KEYCODE_SPACE:    shootHeld = false; break;
					case KEYCODE_A:
					case KEYCODE_LEFT:     lfHeld = false; break;
					case KEYCODE_D:
					case KEYCODE_RIGHT:    rtHeld = false; break;
					case KEYCODE_W:
					case KEYCODE_UP:       upHeld = false; break;
					case KEYCODE_S:
					case KEYCODE_DOWN:     downHeld = false; return false;							
			}
	}

	
}

function tick(event) { 
	//console.log("TICK!!!"); 
	// move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
	//player.x += event.delta/1000*100;
	// this will log a steadily increasing value:
			
	//player pos
	
	//handle turning 
	if(alive && lfHeld){
			player.x -= event.delta/1000*WALK_FACTOR;
	} else if(alive && rtHeld) {
			player.x += event.delta/1000*WALK_FACTOR;
	}		
	
	if(alive && upHeld){
			player.y -= event.delta/1000*WALK_FACTOR;
	} else if(alive && downHeld) {
			player.y += event.delta/1000*WALK_FACTOR;
	}	
	
	//infinite stage
	if(player.x>stage.canvas.width){player.x = 0};
	if(player.x<0){player.x = stage.canvas.width};

	if(player.y>stage.canvas.height){player.y = 0};
	if(player.y<0){player.y = stage.canvas.height};				
			
	stage.update(event);	//stage update on every tick
	//console.log("total time: "+createjs.Ticker.getTime());		
}

function preload(){
	//preload images, etc
	var img = new Image();
	img.onload = onImageLoaded;
	img.src = 'assets/img/doge.png';

	function onImageLoaded(e) {
		player = new Player(img);
		stage.addChild(player);
		player.reset();
		player.setPosition(150, 100);
		
		//create the ticker	
		createjs.Ticker.setFPS(30);
		createjs.Ticker.on("tick", tick);
	}
}


// notes
//-------
//use tweenjs to animate 
//reatejs.TweenJS.get(circle).to({x:300}, 1000).to({x:0}, 0).call(onAnimationComplete);

//space game reference: https://github.com/CreateJS/EaselJS/blob/master/examples/Game.html

//retro game tutorial with easeljs http://indiegamr.com/retro-style-plattform-runner-game-for-mobile-with-easeljs-part-1/
