function Bag()
{
	DrawableObject.call(this);
	
	
	this.path =  null;
	this.time = 0;
	this.id = '';
	this.router;
	this.passenger;
	this.contents=null;
	this.lost = false;
	this.isGrabbed = false; 
	this.fillColor = "#6e6359";
	
	this.destination;
	this.currentHandler = null; //the Handler the bag is currently on. 
	
	//---- Initialize ---
	this.init = function(_airport,  _currentHandler, _destination)
	{
		this.initDrawableObject(new Point(0,0));
		this.initBag(_airport,  _currentHandler, _destination);
		view.addBagDrawableObject(this);
	}
	
	this.initBag = function(_system, _currentHandler, _destination)
	{
		this.currentHandler = _currentHandler; //set the curent handler

		this.pos.x = this.currentHandler.getPos().x;
		this.pos.y = this.currentHandler.getPos().y;
		this.destination = _destination;
		//Generate ID
		this.id = _system.generateID(5)
		//Generate Content Here
		this.contents=buildBagContents(this);
		
		this.router = _system.router;
		this.width = 7 + Math.floor(Math.random()*4)-2;
		this.height= 7 + Math.floor(Math.random()*4)-2;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
		
		//console.log("The destination for bag " + this.id + " is " + this.destination.getID());
		this.recalculatePath();
		//console.log("Bag: bag Made");
	}
	
	this.setNewHandler = function(_handler)
	{
		this.currentHandler = _handler;
		this.pos.x = this.currentHandler.getPos().x;
		this.pos.y = this.currentHandler.getPos().y;
		//console.log("Bag: new loc "+this.pos.toString());
		
	}
	
	this.chooseBetween = function(_activeLinks, _depth){
		if(this.lost){
			this.recalculatePath();
			if(this.lost) return;

		}
		if(this.path == null)
		{
			return;	
		}
		var nextnode = this.path.pop();
		
		while(nextnode == undefined)
		{
			this.recalculatePath();
			if(this.lost) return;
			nextnode = this.path.pop();
		}
		var index = null;
		for(l in _activeLinks)
		{	//console.log(this.currentHandler.getID());
			//console.log("Path: " + nextnode + " link: " + _activeLinks[l].getID());
			if(_activeLinks[l].getID().indexOf(nextnode) > -1)
			{
				index = l;
			}
		}
		if(index == null)
		{	//console.log("Recalculating...");
			this.recalculatePath();
			if(this.lost) return;
			if(_depth > 7) {
				this.lost = true;
				return null;
			}
			
		}
		//console.log(index);
		if(index) return _activeLinks[index];
	}
	
	//Other bag stuff here
	
	this.checkClick = function(_mousePos)
	{
		
		if( this.checkCollisionBounds(_mousePos))// if handler was clicked
		{
			alert("Bag: " + this.id + "\n Contents: " + this.contents + "\n Path: " + this.path + "\n Lost: " + this.lost);
		}
	}
	
	//recalculate the path for the bag using the router
	this.recalculatePath = function ()
	{
		//have the router calculate a new path for the bag
		this.path = this.router.calculatePath(this);
		if(this.path == null) 
		{
			this.setLost(true);
		}
		else
		{
			this.setLost(false);
		}
		//console.log(this.path);
	}
	
	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, this.fillColor);
		drawStrokedRectangle(this.pos, 1,this.width,this.height, "#000");
		if(this.lost)
		{
			drawStrokedCircle(this.pos, 15,  2, "#ff4200");

		}
	}
	
	this.setLost = function(_isLost)
	{
		if(_isLost)
		{
			this.lost = true;
			//console.log(this.currentHandler.getID()+" , "+this.currentHandler.lostBags);
			//this.currentHandler.lostBags.push(this);
		}
		else
		{
			this.lost = false;
			//this.currentHandler.lostBags.splice(this.currentHandler.lostBags.lastIndexOf(this), 1);
		}
	}
}
