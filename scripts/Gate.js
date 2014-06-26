function Gate()
{
	Handler.call(this);
	
	this.outLinksMax = 0; 
	this.inLinksMax  = 1;
	
	this.collectionPoint = null;
	this.plane = null;
	this.planeDocked = false;
	
	this.init = function(_posPoint, _id)
	{
		this.initHandler(_posPoint, _id);
		this.initGate();
		
	}
	
	this.initGate = function(_airport)
	{
		this.width  =  10;
		this.height =  10;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
		airport.addGate(this);
		this.collectionPoint = airport.getIn().handlers['c' + this.id];
	}
	
	
		//---- Update ---
	this.update = function()
	{	
		if(this.updateHandler()){
			this.updateGate();
		}
	}
	
	
	this.updateGate = function(){
		
		if(this.bags.length < 1) return;
		var bag = this.bags.pop();
		if(bag.destination.id != this.id)
		{
			alert("Bag " + bag.id + " at wrong gate! Wanted " + bag.destination.id + " but got " + this.id);
			bag.lost = true;
			return;
		}
		delete view.drawableBagObjects[bag.id];
		if(!this.planeDocked) return;
		this.plane.storageHold.push(bag);
	}
	
	this.drawSelf = function()
	{
		var color = "#cdb7de";
		if (this.plane) color = "#1BE022";
		if (this.planeDocked) color = "#FF0000";
		drawFilledRectangle(this.pos,this.width,this.height, color);
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	
}