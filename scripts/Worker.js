function Worker()
{
	DrawableObject.call(this);
	this.id = null;
	
	
	this.collections = null; 
	
	this.restPos = null; 
	this.targetPos = null;
	this.gbIndex = null;
	this.mbIndex = null;
	this.colIndex = null; 
	
	this.speed = 7; 
	this.grabRadius = 10; 
	
	this.threshHoldTick = 0;
	this.updateTick = 0;
	this.canUpdate = true;
	
	
	this.lineColor = null;
	this.lineColorActive = "#ff0";
	this.lineColorBuisy = "#004fc5";
	
	
	
	this.initWorker = function(_posPoint,_id)
	{
		this.initDrawableObject(_posPoint);
		this.restPos = _posPoint; 
		
		
		this.isActive = true;
		this.id = _id;
		this.width = 10;
		this.height= 10; 
		
		this.lineColor = this.lineColorActive;
		
		
	}
	
	this.update = function()
	{
		if(this.updateWorker()){
			this.workerAI();	
		}
	} 
	
	this.updateWorker = function()
	{
		this.threshHoldTick = 0;
		this.updateTick = 0;
		this.canUpdate = true; 
		
		if(this.updateTick >= (this.threshHoldTick/systemSpeed)){
			this.canUpdate = true;
			this.updateTick = 0;
		}
		
		if(this.canUpdate && this.updateTick != 0){
			this.canUpdate = false;
		}
		
		this.updateTick++;
		
		if(!this.canUpdate){
			return false;
		}
		return true;
	}
	
	this.workerAI = function()
	{
		if(this.mbIndex == null)
		{
			if(this.gbIndex == null)
			{
				this.gbIndex = this.findClosestLostBag();
				
			}
			else if (view.drawableBagObjects[this.gbIndex].isLost == false || view.drawableBagObjects[this.gbIndex].isGrabbed == true)
			{	
				this.gbIndex = null; 
				this.targetPos = null;
			}
			else if(Distance(view.drawableBagObjects[this.gbIndex].pos, this.pos) < this.grabRadius && view.drawableBagObjects[this.gbIndex].isGrabbed == false)
			{
				//console.log("Grab bag"+view.drawableBagObjects[this.gbIndex].pos + this.pos.toString());
				this.mbIndex = this.gbIndex;
				//view.drawableBagObjects[this.mbIndex].currentHandler.bags.splice(view.drawableBagObjects[this.mbIndex].currentHandler.bags.lastIndexOf(this), 1);// remove this bag
				view.drawableBagObjects[this.mbIndex].currentHandler.removeBag(view.drawableBagObjects[this.mbIndex].id); 
				view.drawableBagObjects[this.mbIndex].setLost(false);
				view.drawableBagObjects[this.mbIndex].isGrabbed = true;
				//view.drawableBagObjects[this.mbIndex].currentHandler = null;
				this.gbIndex = null; 
				this.targetPos = null;
			}
			else
			{
				this.targetPos = view.drawableBagObjects[this.gbIndex].pos;
			}
			
		}
		else 
		{
			
			if(this.targetPos == null)
			{
				var	cIndex = null; 
				cIndex = this.findClosestCollectionPoint();	
				
				if(cIndex!=null)
				{
					this.targetPos = this.collections[cIndex].pos;
					this.colIndex = cIndex;
				}
			}
			else if( Distance(this.targetPos, this.pos) < this.grabRadius)
			{
				//console.log("Drop");
				view.drawableBagObjects[this.mbIndex].isGrabbed = false;
				this.collections[this.colIndex].takeBag(view.drawableBagObjects[this.mbIndex]);
				this.targetPos = null;
				this.gbIndex = null;
				this.mbIndex = null;
				this.colIndex = null; 
			}
			else
			{
				view.drawableBagObjects[this.mbIndex].pos.x = this.pos.x; 
				view.drawableBagObjects[this.mbIndex].pos.y = this.pos.y; 
			}
			
		}
		 
		this.moveToTarget();
	}
	
	this.findClosestCollectionPoint = function()
	{
		//console.log("find Closest bag");
		var distence = null;
		var lastDistence = 100000000;
		var cIndex = null;
		for(var c in this.collections)
		{
			if(this.collections[c].isActive)
			{
				distence = Distance(this.collections[c].pos, this.pos);
				
				if(distence < lastDistence)
				{
					//console.log("ld "+lastDistence+"  "+Distance(this.collections[c].pos, this.pos));
					lastDistence = distence;
					cIndex = c;
				}
			}
		}
		
		return cIndex;
		
		
	}
	this.findClosestLostBag = function()
	{
		//console.log("find Closest bag");
		var distence = null;
		var lastDistence = 100000000;
		var lbIndex = null;
		for(var d in view.drawableBagObjects)
		{
			if(view.drawableBagObjects[d].lost && view.drawableBagObjects[d].isGrabbed == false)
			{
				distence = Distance(view.drawableBagObjects[d].pos, this.pos);
				if(distence < lastDistence)
				{
					lastDistence = distence;
					lbIndex = d;
				}
			}
		}
		
		return lbIndex;
		
	}
	
	this.moveToTarget = function()
	{
		if(this.targetPos != null)
		{
			var angle = Math.atan2(this.targetPos.y-this.pos.y, this.targetPos.x-this.pos.x);
			this.pos.x += Math.cos(angle)*this.speed*systemSpeed;
			this.pos.y += Math.sin(angle)*this.speed*systemSpeed;
		}
	}
	
	
	this.setCollections = function(_collections)
	{
		this.collections = _collections; 
	}
	
	this.drawSelf = function()
	{
		drawStrokedRectangle(this.pos, 2, this.width, this.height,  this.lineColor);
	}
	
	this.drawID = function()
	{
		drawText(this.pos.x,this.pos.y-this.height-2, 8, "white", this.id);
	}
	
	this.getID = function(){return this.id;}
}
