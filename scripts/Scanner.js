function Scanner()
{
	Handler.call(this);
	
	this.outLinksMax = 2; 
	this.inLinksMax  = 1;
	this.secLink=null; 
	this.bagsMax = 1;
	
	this.securityLink = null; 
	
	//---- Initialize ---
	this.init = function(_posPoint, _id)
	{
		this.initHandler(_posPoint, _id);
		this.initScanner();
		
	}
	
	this.initScanner = function()
	{
		this.width  =  15;
		this.height =  15;
		this.radialWidth=Math.sqrt( Math.pow(this.width,2) + Math.pow(this.height,2));

		bannedList = illegalContents;

		this.threshHoldTick = 5;

	}
	
	
	//---- Update ---
	this.update = function()
	{	
		if(this.updateHandler()){
			this.updateScanner();
		}
	}
	
	this.updateScanner = function()
	{	
		if (this.secLink == null)
		{
			this.secLink=this.getSecurityLink();
		}
		
		if(this.bags.length > 0){
			this.compare();
			
		}		
		
	}
	
	this.getSecurityLink = function()
	{ 
		for (var s in this.outLinks)
		{
			if(this.outLinks[s].getID().indexOf('sec')!= -1)
			{
				return this.outLinks[s]; 
			}
		}
	}
	
	/*Function compare will get the contents from bag and compare to
	banned list. A bag found with a banned item will be rerouted to the
 	security link. Otherwise it will pass and continue onto its	calculated path. 
	*/

	this.compare = function()
	{  
		var currentBag = this.bags.shift();
		
		var contents = currentBag.contents;
		var tags= new Array();
		
		for(var i in contents){
			tags[i] = illegalContents.indexOf(contents[i])!= -1;
			
			if (tags[i]){
				//console.log(this.secLink.getID());
				if(this.secLink.canThisTakeBag())
				{
					this.secLink.takeBag(currentBag);
					return;
				}
			}
			//Sends bag if there is nothing wrong with it
		}
		target = this.activeLinks[0];
		if(target.canThisTakeBag()){
			target.takeBag(currentBag);
			this.canUpdate = true;
			return
		}
		
		this.bags.unshift(currentBag);
				
	}

	this.drawSelf = function()
	{
		drawFilledRectangle(this.pos,this.width,this.height, "#00ffa2");
		drawStrokedRectangle(this.pos, 2,this.width,this.height, this.lineColor);	
	}
	
}