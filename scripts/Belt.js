function Belt()
{
	Handler.call(this);
	
	this.outLinksMax = 1; 
	this.inLinksMax  = 1; 
	
	this.inPoint   = null;
	this.outPoint  = null;
	this.length = null;
	
	this.angle = null; //from inPoint to outPoint in radians
	this.speed = null; // pixels/update
	this.speedVector = new Point(0,0); //x and y components of the belt's movement
	
	this.lineColorActive = "#3e3934";
	this.lineColorBuisy = "#3e3934";

	
	this.init = function(_id)
	{
		this.initHandler(new Point(0,0), _id);
		this.initBelt();
		
	}
	
	this.initBelt = function()
	{	
		this.angle = Math.atan2(this.outLinks[0].pos.y-this.inLinks[0].pos.y, this.outLinks[0].pos.x-this.inLinks[0].pos.x);
		//this.id = this.id+" "+this.angle*180/Math.PI; 
		this.inPoint  	=  new Point(this.inLinks[0].pos.x + Math.cos(this.angle)*(this.inLinks[0].radialWidth+1), this.inLinks[0].pos.y + Math.sin(this.angle)*(this.inLinks[0].radialWidth+1)); 
		this.outPoint 	=  new Point(this.outLinks[0].pos.x - Math.cos(this.angle)*(this.outLinks[0].radialWidth+1), this.outLinks[0].pos.y - Math.sin(this.angle)*(this.outLinks[0].radialWidth+1 ));
	
		this.pos.x = this.inPoint.x;
		this.pos.y = this.inPoint.y;
	
		this.speed = 5; 

		this.length = Math.sqrt(Math.pow((this.inPoint.x - this.outPoint.x),2) + Math.pow((this.inPoint.y - this.outPoint.y),2) );//get length of belt by pythagorean. 
		
		
	
		this.bagsMax = this.length/15;
		
		//console.log("Belt from "+this.inPoint.toString()+" to "+this.outPoint.toString()+" length:"+this.length + " speed:"+this.speed+" vector"+this.speedVector.toString()+" angle" + this.angle);
	}
	
	
	this.update = function()
	{	
		this.updateHandler();
		this.updateBelt();
	}
	
	this.updateBelt = function()
	{
		this.time = Math.round(this.length/this.speed);
		this.speedVector.x = Math.cos(this.angle)*this.speed*systemSpeed;
		this.speedVector.y = Math.sin(this.angle)*this.speed*systemSpeed;
		
		if(this.bags.length > 0)
		{
			if(this.isActive)
			{
				this.moveBags();
			}
		}	
		
	}
	
	
	this.moveBags = function()
	{
		if(!this.bags[0])  return;
		if(Distance(this.bags[0].pos, this.outPoint) < this.bags[0].radialWidth)
		{
			if(this.outLinks[0].canThisTakeBag())
			{
				this.outLinks[0].takeBag(this.bags.shift());
			}
		}
		else 
		{
			this.bags[0].pos.addPoint(this.speedVector);
		}
		
		for( var i = 1; i < this.bags.length; i++)// loop through all but the first bag
		{
			if(this.bags[i] != undefined && this.bags[i-1] != undefined && Distance(this.bags[i].pos, this.bags[i-1].pos) > (this.bags[i].radialWidth+this.bags[i-1].radialWidth)/2)
			{	if(this.bags[i])
					this.bags[i].pos.addPoint(this.speedVector);
			}
		} 
	}
	
	this.CanThisTakeBag = function()
	{
		if(this.isActive && (this.bagsMax == null || this.bags.length < this.bagsMax) )
		{
			for(var b in this.bags)
			{
				if (Distance(this.bags[b].pos, this.inPoint) < this.bags[b].radialWidth)
				{
					return false; 
				}
			} 
			return true; 
		}	
		return false; 
	
	}
	
	this.drawSelf = function()
	{
		
			drawLine(this.inPoint,this.outPoint,  3, this.lineColor);
			drawFilledCircle(this.inPoint, 5,  this.lineColor);
	
	
	}
	
	//---- Getters Setters ----
	this.getID = function(){return this.outLinks[0].getID();} // override for get ID. Belts return the ID of their out link. 
}
