function SecurityCollection()
{
	Handler.call(this);
	
	this.outLinksMax = 0; 
	this.inLinksMax  = 1;
	
	this.init = function(_posPoint, _id)
	{
		this.initHandler(_posPoint, _id);
		this.initSecurityCollection();
		
	}
	
	this.initSecurityCollection = function()
	{
		this.width  =  30;
		this.height =  20;
		this.radialWidth=30;
	}
	
	
		//---- Update ---
	this.update = function()
	{	
	
		if(this.updateHandler()){
			this.updateSecurityCollection();
		}
		this.isActive = true;
	}
	
	
	this.updateSecurityCollection = function()
	{
		if(this.bags.length == 0) return;
		var bag = this.bags.pop();
		var id = bag.id;
		delete bag;
		delete view.drawableBagObjects[id];
	}
	
	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, "#7fff00");
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	

}