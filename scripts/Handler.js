function Handler()
{
	DrawableObject.call(this);
	
	this.outLinks 	= new Array();
	this.outLinksMax = null;
	this.activeLinks = new Array();
	this.inLinks  	= new Array();
	this.inLinksMax 	= null; 
	
	this.bags 		= new Array();
	this.bagsMax	 	= null;
	
	this.threshHoldTick = 0;
	this.updateTick = 0;
	this.canUpdate = true;
	
	this.time = 0;

	this.isActive = null;
	this.isOffManual = false;// Manual active override
	
	this.lineColor = null;
	
	this.lineColorActive = "#000";
	this.lineColorBuisy = "#004fc5";
	this.lineColorInactive = "#f00";
	
	this.id = null;
	
	//---- Initialize ---
	
	this.initHandler = function(_posPoint,_id)
	{
		this.initDrawableObject(_posPoint);
		this.isActive = true;
		this.id = _id;
		
	}
	
	//---- Update ---
	this.update = function()
	{
		return this.updateHandler();
	} 
	
	this.updateHandler = function()
	{
		
		this.setActiveState(this.updateStateFromOutLinks());
		this.checkActiveState();
		this.updateLineColors();
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
	
	this.updateStateFromOutLinks = function()
	{
		if(!this.isOffManual)
		{
			if(this.outLinksMax != 0)
			{
				this.activeLinks = new Array();
				flag = false;
				for(o in this.outLinks)
				{
					if(this.outLinks[o].getActiveState() == true)
					{
						flag = true;
						if(this.outLinks[o].canThisTakeBag())
						{
							this.activeLinks.push(this.outLinks[o]);
						}
					}
					
				}
				return flag;
			}
			else
			{
				return true; 	
			}
		}
		else
		{
			return false; 	
		}
	}
	
	this.updateLineColors = function()
	{
		if(!this.isActive)
		{
			this.lineColor = this.lineColorInactive;
		}
		else if(this.bags.length > 0)
		{
			this.lineColor = this.lineColorBuisy;
		}
		else
		{
			this.lineColor = this.lineColorActive;
		}
	}
	
	this.addInLink = function(_handler)
	{
			//alert("linkadded");
		if (this.inLinksMax	== null || this.inLinks.length < this.inLinksMax)// if i have room for more in links, add inlink and return true for the request
		{ 
			this.inLinks[this.inLinks.length] = _handler;
			//allertGetting
			return true;
		}
		else
		{
			return false;
		}
	}
	
	
	this.addOutLink = function(_handler)
	{
		if (this.outLinksMax == null || this.outLinks.length < this.outLinksMax)// I have room for new out link. 
		{
			if (_handler.addInLink(this)) //if the link accepts my request  			
			{
				this.outLinks[this.outLinks.length] = _handler;
				return true;
			}
			return false;
		}
		return false;
	}
	
	this.canThisTakeBag = function()
	{
		if(this.isActive && (this.bagsMax == null || this.bags.length < this.bagsMax) )
		{
			return true; 
		}	
		return false; 
	
	}
	
	this.sendBag = function(){
		if(!(this.activeLinks.length > 0 && this.bags.length > 0)){
			return;
		}
		currentBag = this.bags.shift();
		target = this.activeLinks[0];
		
		if(this.activeLinks.length > 1){
			target = currentBag.chooseBetween(this.activeLinks, 0);
			if(!target){
				this.bags.unshift(currentBag);
				return;
				}
		}
		
		if(target.canThisTakeBag()){
			target.takeBag(currentBag);
			this.canUpdate = true;
		}
		else {
		
			this.bags.unshift(currentBag);
		}
	}
	
	this.takeBag = function(_bag)
	{
		
		if (_bag == null)
		{
			return null;
		}
		else if(this.isActive && (this.bagsMax == null || this.bags.length < this.bagsMax) )
		{
			_bag.setNewHandler(this);
			this.bags.push(_bag);
			
			return null;
			
		}
		else
		{
			return _bag;
		}
		
	}
	
	this.removeBag = function(_id)
	{
		


		
		var index = null;
 		for(var b in this.bags)
		{
			if(this.bags[b].id == _id)
			{
				index = b; 
				break; 
			}
		}
		if(index != null)
		{
			//console.log("removing bag" + this.bags[index].id +" " + this.bags.length);
			this.bags.splice(index,1);
			//delete this.bags[index];
			//this.bags.length -= 1;
			//console.log("removing bag"  + this.bags.length); 
		}

		
	}
	
	this.checkActiveState = function()
	{
		if(!this.isActive)
		{
			for(var b in this.bags)
			{
				this.bags[b].setLost(true);
			}
		}
	}
	
	this.checkClick = function(_mousePos)
	{
		if( this.checkCollisionBounds(_mousePos))// if handler was clicked
		{
			this.isOffManual = !this.isOffManual;
		}
	}
	


	//---- Getters Setters ----
	this.getActiveState = function(){return this.isActive;}
	this.setActiveState = function(_active)
	{
		this.isActive = _active;
	}
	this.getID = function(){return this.id;}
}
