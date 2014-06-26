function CollectionPoint()
{
	Handler.call(this);
	
	this.outLinksMax = 1; 
	this.inLinksMax  = null; 
	this.bagsMax = 1000;
	
	this.init = function( _posPoint, _id)
	{
		this.initHandler(_posPoint, _id);
		this.initCollectionPoint();
		
	}
	
	this.initCollectionPoint = function()
	{
		this.width  =  10;
		this.height =  10;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));
		airport.collectionPointList.push(this);
	}
	
	this.giveAll = function(_bags)
	{
		this.bags = this.bags.concat(_bags);
	}
	//---- Update ---
	this.update = function()
	{	
		if(this.updateHandler()){
			this.updateCollectionPoint();
		}
	}
	
	this.updateCollectionPoint = function()
	{	
		this.sendBag();
	}
	
	
	
	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, "#888888");
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	
}