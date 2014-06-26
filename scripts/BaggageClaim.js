function BaggageClaim()
{
	Handler.call(this);
	
	this.outLinksMax = 0; 
	this.inLinksMax  = 1;
	this.threshHoldTick = 1;
	
	this.init = function(_posPoint, _id)
	{
		this.initHandler(_posPoint, _id);
		this.initBaggageClaim();
		
	}
	
	this.initBaggageClaim = function()
	{
		this.width  =  20;
		this.height =  50;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
		airport.addBaggageClaim(this);
	}
	
	
		//---- Update ---
	this.update = function()
	{	
	
		if(this.updateHandler()){
			this.updateBaggageClaim();
		}
		this.isActive = true;
	}
	
	
	this.updateBaggageClaim = function()
	{
		if(this.bags.length == 0) return;
		var bag = this.bags.pop();
		var id = bag.id;
		delete bag;
		delete view.drawableBagObjects[id];
	}
	
	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, "#cdb7df");
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	

}