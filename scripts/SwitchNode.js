function SwitchNode()
{
	Handler.call(this);
	
	this.bagsMax = 1;
	this.currentBag = null;
	//
	
	//---- Initialize ---
	this.init = function(_posPoint,_id)
	{
		this.initHandler(_posPoint,_id);
		this.initSwitchNode();	
	}
	
	this.initSwitchNode = function()
	{
		this.width  =  10;
		this.height =  10;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
		this.threshHoldTick = 5 + (this.outLinks.length * 10);
	}
	
	//---- Update ---
	this.update = function()
	{
		if(this.updateHandler()){
			this.updateSwitchNode();
		}
	}
	this.updateSwitchNode = function()
	{	
		
		this.sendBag();
		
	}
	
	
	this.drawSelf = function()
	{
		drawFilledCircle(this.pos, this.width, "#74c6e5");
		drawStrokedCircle(this.pos, this.width, 2, this.lineColor);
		
		
	}
}