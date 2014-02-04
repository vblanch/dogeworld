(function (window) {
	function Player(image) {
		this.initialize(image);
	}
	
 	Player.prototype = new createjs.Bitmap();

 	// save the original initialize-method so it won't be gone after
 	// overwriting it
 	Player.prototype.Bitmap_initialize = Player.prototype.initialize;

 	// initialize the object
 	Player.prototype.initialize = function (image) {
	    this.velocity = {x:0,y:0};
 		this.Bitmap_initialize(image);
 		this.name = 'Player';
 		this.snapToPixel = true;
		this.PLAYER_MOV = 5;
 	}

 	// we will call this function every frame to 
	//Player.prototype.tick = function () {
		/*this.y += 1;*/
		//movement here
 	//}
    Player.prototype.tick = function () {
  
		
		// preparing the variables
		var moveBy = {x:0, y:this.velocity.y},
			collision = null,
			collideables = Game.getCollideables();

		collision = calculateCollision(this, 'y', collideables, moveBy);
		// moveBy is now handled by 'calculateCollision'
		// and can also be 0 - therefore we won't have to worry
		this.y += moveBy.y;

		moveBy = {x:this.velocity.x, y:0};
		collision = calculateCollision(this, 'x', collideables, moveBy);
		this.x += moveBy.x;		
		
		//stop movement
		this.stopHorizontal();
		this.stopVertical();
		
		//console.log("x speed="+this.velocity.x);
		//console.log("y speed="+this.velocity.y);
    }	

	Player.prototype.moveLeft = function(){
		this.velocity.x = -this.PLAYER_MOV;
		//alert("moving left");
	}
	
	Player.prototype.moveRight = function(){
		this.velocity.x = this.PLAYER_MOV;
	}	
	
	Player.prototype.moveUp = function(){
		this.velocity.y = -this.PLAYER_MOV;
	}
	
	Player.prototype.moveDown = function(){
		this.velocity.y = this.PLAYER_MOV;
	}
	
	Player.prototype.stopHorizontal = function(){
		if(this.velocity.x>0) this.velocity.x -= 1; 
		if(this.velocity.x<0) this.velocity.x += 1; 
	}

	Player.prototype.stopVertical = function(){
		if(this.velocity.y>0) this.velocity.y -= 1;
		if(this.velocity.y<0) this.velocity.y += 1;
	}
	
 	// this will reset the position of the Player
 	// we can call this e.g. whenever a key is pressed
 	/*
	Player.prototype.reset = function() {
 		this.y = 0;
 	}
	*/
	
 	Player.prototype.setPosition = function(x,y) {
 		this.x = x;
		this.y = y;
 	}	

 	window.Player = Player;
} (window));