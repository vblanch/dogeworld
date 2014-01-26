//extending class to create Button
(function(){		//anonymous wrapper
    var Button = function(label){    //constructor
	    this.initialize(label);		//initialization
	}
	var p = Button.prototype = new createjs.Container(); //will extend Container
    p.label;	//define new attributes
	p.background;
	p.count = 0; 
	
	p.Container_initialize = p.initialize; //set the container initialize function
	p.initialize = function(label, color){ //redefine initialize
	    this.Container_initialize();   //call parent initialize, important!
		//custom logic in here
		this.label = label;
		if(!color){color = "#ccc";}
		var text = new createjs.Text(label, "20px Arial", "#000");
		text.textBaseline = "top";
		text.textAlign = "center";
		
		var width = text.getMeasuredWidth()+30;
		var height = text.getMeasuredHeight()+20;
		
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawRoundRect(0, 0, width, height, 10);
		
		text.x = width/2;
		text.y = 10;
		
		this.addChild(this.background, text);
		this.on("click", this.handleClick);
		this.on("tick", this.handleTick);
		
		this.mouseChildren = false; //???
	}
	
	p.handleClick = function(event){
		var target = event.target;
		alert("you clicked on a button: " + target.label);
	}
	
	p.handleTick = function(event){
	    p.alpha = Math.cos(p.count++*0.1)*0.4+0.6;
	}
		
	window.Button = Button;  //we make it available at global scope
}());