var		PLAYER_IMAGE = 'assets/img/doge.png',
		PLATFORM_IMAGE = 'assets/img/obstacle.png';

//var stage, player;

var shootHeld;                      //is the user holding a shoot command
var lfHeld;                         //is the user holding a turn left command
var rtHeld;                         //is the user holding a turn right command
var upHeld;                         //is the user holding an up command
var downHeld;                         //is the user holding a down command

//var alive;							//is player alive?

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

function _game() {
	// code here.
	
	window.Game = this;
	//player = new Player();
		
	var self = this,
		ticks = 0,
		canvas,
		stage,
		world,
		player,
		/*w = getWidth(),
		h = getHeight(),
		*/
		w = 640,
		h = 480,
		assets = [],
		keyDown = false;
		
	//alive = true;	//start alive
	//stage = new createjs.Stage("demoCanvas");
		
	// holds all collideable objects
	var collideables = [];
	this.getCollideables = function() { return collideables; };

	// starts to load all the assets
	this.preloadResources = function() {
		self.loadImage(PLAYER_IMAGE);
		self.loadImage(PLATFORM_IMAGE);
	}

	var requestedAssets = 0,
		loadedAssets = 0;
	// loads the assets and keeps track 
	// of how many assets where there to
	// be loaded
	this.loadImage = function(e) {
		var img = new Image();
		img.onload = self.onLoadedAsset;
		img.src = e;

		assets[e] = img;

		++requestedAssets;
	}

	// each time an asset is loaded
	// check if all assets are complete
	// and initialize the game, if so
	this.onLoadedAsset = function(e) {
		++loadedAssets;
		if ( loadedAssets == requestedAssets ) {
			self.initializeGame();
		}
	}
	

	this.initializeGame = function() {
		// creating the canvas-element
		
		canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		canvas.setAttribute("class", "demoCanvas"); 
		document.body.appendChild(canvas);
		
		// initializing the stage
		//stage = new Stage(canvas);
		stage = new createjs.Stage(canvas); 
		world = new createjs.Container();
		stage.addChild(world);

		// creating the Hero, and assign an image
		// also position the hero in the middle of the screen
		player = new Player(assets[PLAYER_IMAGE]);
		player.x = w/2
		player.y = h/2;
		world.addChild(player);

		// add a platform for the hero to collide with
		self.addPlatform(w/2 - assets[PLATFORM_IMAGE].width/2, h/1.25);

		// Setting the listeners
		if ('ontouchstart' in document.documentElement) {
			canvas.addEventListener('touchstart', function(e) {
				self.handleKeyDown();
			}, false);

			canvas.addEventListener('touchend', function(e) {
				self.handleKeyUp();
			}, false);
		} else {
			document.onkeydown = self.handleKeyDown;
			document.onkeyup = self.handleKeyUp;
			document.onmousedown = self.handleKeyDown;
			document.onmouseup = self.handleKeyUp;
		}
		
		createjs.Ticker.setFPS(30);
		//createjs.Ticker.addListener(self.tick);
		createjs.Ticker.on("tick", self.tick);
	}

	this.tick = function(e)
	{
		ticks++;
		player.tick();
		stage.update();
	}
	
	// this method adds a platform at the
	// given x- and y-coordinates and adds
	// it to the collideables-array
	this.addPlatform = function(x,y) {
		x = Math.round(x);
		y = Math.round(y);

		var platform = new createjs.Bitmap(assets[PLATFORM_IMAGE]);
		platform.x = x;
		platform.y = y;
		platform.snapToPixel = true;

		world.addChild(platform);
		collideables.push(platform);
	}

	/*
	this.handleKeyDown = function(e)
	{
		if ( !keyDown ) {
			keyDown = true;
			player.jump();
		}
	}
	*/
	
	this.processKeys = function(){
		//alert("processing...1");
		//handle turning 
		if(lfHeld){
			player.moveLeft();
		} else if(rtHeld) {
			player.moveRight(); // += event.delta/1000*WALK_FACTOR;
		}
		
		if(!lfHeld && !rtHeld){
			//player.stopHorizontal();
		}
		 
		if(upHeld){
			//player.y -= event.delta/1000*WALK_FACTOR;
			player.moveUp();
		} else if(downHeld) {
			player.moveDown();
			//player.y += event.delta/1000*WALK_FACTOR;
		}		
		
		if(!upHeld && !downHeld){
			//player.stopVertical();
		}		
	
		//alert("processing...2");
	}	
	
	//allow for WASD and arrow control scheme
	this.handleKeyDown = function(e) {
			//cross browser issues exist 
			//alert("handling keys");
			if(!e){ var e = window.event; }
			switch(e.keyCode) {
					case KEYCODE_SPACE:    shootHeld = true; break;;
					case KEYCODE_A:
					case KEYCODE_LEFT:     lfHeld = true; break;
					case KEYCODE_D:
					case KEYCODE_RIGHT:    rtHeld = true; break;
					case KEYCODE_W:
					case KEYCODE_UP:       upHeld = true; break;
					case KEYCODE_S: 
					case KEYCODE_DOWN:     downHeld = true; break;					
					//case KEYCODE_ENTER:    if(canvas.onclick == handleClick){ handleClick(); }break;
			}
			//alert("test 2");
			self.processKeys(); 
			return false;
	}	


	
	/*
	this.handleKeyUp = function(e)
	{
		keyDown = false;
	}
	*/
	
	this.handleKeyUp = function(e) {
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
					case KEYCODE_DOWN:     downHeld = false; break;							
			}
			self.processKeys(); 
			return false;
	}	

	self.preloadResources();
};

new _game();	


/*	
		
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

	/*
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
	*/

	//self.preloadResources(); 
//}




//new _game();

// notes
//-------
//use tweenjs to animate 
//reatejs.TweenJS.get(circle).to({x:300}, 1000).to({x:0}, 0).call(onAnimationComplete);

//space game reference: https://github.com/CreateJS/EaselJS/blob/master/examples/Game.html

//retro game tutorial with easeljs http://indiegamr.com/retro-style-plattform-runner-game-for-mobile-with-easeljs-part-1/
