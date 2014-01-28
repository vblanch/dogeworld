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
        //this.velocity.y += 1;
		
		//alert("contents of velocity:" + this.velocity.x + " " + this.velocity.y);
		
        // preparing the variables
		
		//alert("vely="+this.velocity.y);
		
		var c = 0,
			cc = 0,
			addY = this.velocity.y,
			addX = this.velocity.x,	//new
			bounds = getBounds(this),
			cbounds,
			collision = null,
			collideables = Game.getCollideables();			
			
		cc=0;
		//var addY = this.velocity.y;
				
		// for each collideable object we will calculate the
		// bounding-rectangle and then check for an intersection
		// of the hero's future position's bounding-rectangle
		while ( !collision && cc < collideables.length ) {
			cbounds = getBounds(collideables[cc]);
			if ( collideables[cc].isVisible ) {
				collision = calculateIntersection(bounds, cbounds, 0, addY);
			}
			if ( !collision && collideables[cc].isVisible ) {
				// if there was NO collision detected, but somehow
				// the hero got onto the "other side" of an object (high velocity e.g.),
				// then we will detect this here, and adjust the velocity according to
				// it to prevent the Hero from "ghosting" through objects
				// try messing with the 'this.velocity = {x:0,y:25};'
				// -> it should still collide even with very high values
				if ( ( bounds.y < cbounds.y && bounds.y + addY > cbounds.y )
				  || ( bounds.y > cbounds.y && bounds.y + addY < cbounds.y ) ) {
					addY = cbounds.y - bounds.y;
				} else {
					cc++;
				}
			}
		}

		// if no collision was to be found, just
		//  move the hero to it's new position
		if ( !collision ) {
			//if(this.velocity.y!=0) alert("no collision:"+this.y + " addy="+ addY);
			this.y += addY;
		// else move the hero as far as possible
		// and then make it stop and tell the
		// game, that the hero is now "an the ground"
		} else {
			//if(this.velocity.y!=0) alert("collision:"+this.y + " addy="+ addY);
			this.y += addY - collision.height;
			this.velocity.y = 0;
		}
		
		//same for X!
		/////////////
		
		cc=0;
		while ( !collision && cc < collideables.length ) {
			cbounds = getBounds(collideables[cc]);
			if ( collideables[cc].isVisible ) {
				collision = calculateIntersection(bounds, cbounds, addX, 0);
			}
			if ( !collision && collideables[cc].isVisible ) {
				// if there was NO collision detected, but somehow
				// the hero got onto the "other side" of an object (high velocity e.g.),
				// then we will detect this here, and adjust the velocity according to
				// it to prevent the Hero from "ghosting" through objects
				// try messing with the 'this.velocity = {x:0,y:25};'
				// -> it should still collide even with very high values
				if ( ( bounds.x < cbounds.x && bounds.x + addX > cbounds.x )
				  || ( bounds.x > cbounds.x && bounds.x + addX < cbounds.x ) ) {
					addX = cbounds.x - bounds.x;
				} else {
					cc++;
				}
			}
		}

		// if no collision was to be found, just
		//  move the hero to it's new position
		if ( !collision ) {
			//if(this.velocity.y!=0) alert("no collision:"+this.y + " addy="+ addY);
			this.x += addX;
		// else move the hero as far as possible
		// and then make it stop and tell the
		// game, that the hero is now "an the ground"
		} else {
			//if(this.velocity.y!=0) alert("collision:"+this.y + " addy="+ addY);
			this.x += addX - collision.width;
			this.velocity.x = 0;
		}
		
		//stop movement
		this.stopHorizontal();
		this.stopVertical();
		
		console.log("x speed="+this.velocity.x);
		console.log("y speed="+this.velocity.y);
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