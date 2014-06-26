function CheckIn()
{
	Handler.call(this);
	
	this.outLinksMax = 1; 
	this.inLinksMax  = 0; 
	
	this.airport = null; //a refrence to airport to give to the bags 
	
	//---- Initialize ---
	this.init = function(_posPoint, _id)
	{
		this.initHandler(_posPoint,_id);
		this.initCheckIn();
		airport.addCheckIn(this);
	}
	
	this.initCheckIn = function()
	{
		this.airport = airport;
		this.width  =  15;
		this.height =  15;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
	}
	
	
	//---- Update ---
	this.update = function()
	{	
		this.updateHandler();
		this.updateCheckIn();
	}
	
	this.updateCheckIn = function()
	{
		var bag = null
		if(this.outLinks[0] && this.outLinks[0].canThisTakeBag())
		{
		 	bag = this.bags.pop();
		} 	
		if(bag != null)
		{
			this.outLinks[0].takeBag(bag);
			
		}
	}
	
	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, "#bce8ff");
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	
}
