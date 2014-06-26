
	
function BaggageSystem(_airport, _id){

constructors = new Array();
constructors["node"] = SwitchNode;
constructors["belt"] = Belt;
constructors["checkin"] = CheckIn;
constructors["scanner"] = Scanner;
constructors["gate"] = Gate;
constructors["coll"] = CollectionPoint;
constructors["bagclaim"] = BaggageClaim;
constructors["security"] = SecurityCollection;

	this.id = _id;
	this.airport = _airport;
	this.handlers = new Array();
	this.nodelist = new Array();
	this.collections = new Array();
	this.workers = new Array();
	
	this.numBelts = 0;
	this.router = new Router(this);
	
	this.utilityHandler = null; 
	
	this.generateID = function(num)
	{
		var n = '';
		for(var i = 0; i < num; i++)
		{
			//randomly generate part of the id
			var part = Math.round(Math.random() * 61) + 48;
			//limit the generation to capital letters
			if(part <= 90 && part > 64)
			{
				n = n + String.fromCharCode(part);
			}
			else i = i - 1;
		}
		return n;
	}
	this.constructWorkers =  function()
	{
		
		var worker = null
		for(var j = 0; j<6; j++)
		{
			var worker = new Worker();
			worker.setCollections(this.collections);
			//SHOULD HAVE BEEN DONE VIA XML
			worker.initWorker(new Point(0+j*500+(Math.floor(Math.random()*100)-50), 600+(Math.floor(Math.random()*100)-50)),"w"+j);
			view.addDrawableWorker(worker);
			//console.log("worker made");
			this.workers[j] = worker; 
			//this.utilityHandler = new UtilityHandler();
			//this.utilityHandler.init(new Point(600, 450),"UH");
			//view.addDrawableObject(this.utilityHandler);	
		}
		
	}
	
	
	this.constructHandlers =  function()
	{
		var contents = config.getElementsByTagName("system_" + this.id)[0];
		var hInfo = contents.getElementsByTagName("HANDLERS")[0].childNodes;
		var cInfo = contents.getElementsByTagName("CONNECTIONS")[0].childNodes;
	
		//I apologize for the explicit iteration - however, when I abstracted this to their own functions,
		//it almost doubled the length of code. es tut mir leid - Ezra
		for(i in hInfo){
			if(hInfo[i].attributes){
				handlerInfo = hInfo[i];
				handler = new constructors[handlerInfo.tagName]();
				x= parseInt(handlerInfo.attributes["x"].value);
				y= parseInt(handlerInfo.attributes["y"].value);
				id = handlerInfo.attributes["id"].value;
			
				handler.init(new Point(x,y), id);
				
				this.handlers[handler.id] = handler;
				this.nodelist.push(handler);
				view.addDrawableObject(handler);
				if(handler instanceof CollectionPoint)
				//add handlers that are collection points to the colelction point list
				{
					this.collections.push(handler);
				}
				
			}
		
		}//Belts and other handlers just get... totally different initialization.
		//Plus, belts can only be initialized when everything else exists.
		for(i in cInfo){
			if(cInfo[i].attributes){
				from = cInfo[i].attributes["from"].value;
				to = cInfo[i].attributes["to"].value;
				if(this.handlers[from] && this.handlers[to]){
					belt = new Belt();
					
					this.handlers[from].addOutLink(belt);
					belt.addOutLink(this.handlers[to]);
					var id = "b" + this.numBelts++;
					belt.init(id);
					this.handlers[id] = belt;
					view.addDrawableObject(belt);
				}
			}
		}
	}
	

	this.update = function()
	{
		CallAll(this.handlers, "update");
		CallAll(this.workers, "update");
	}
	
	this.init = function()
	{
		this.constructHandlers();
		this.constructWorkers();
	}
	
	
	this.checkClick = function(_mousePos)
	{
		for(var n in this.nodelist)
		{
			this.nodelist[n].checkClick(_mousePos);	
		}
	}
}