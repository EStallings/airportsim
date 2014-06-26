function Airport()
{
	this.in_baggage, this.out_baggage;
	this.id;
	
	this.checkInList = new Array();
	this.gateList = new Array();
	
	this.airlines = new Array();
	this.airports = ["LAX", "LHW", "PDX", "SUN", "JFK", "HKG", "MSK"];
	
	this.collectionPointList = new Array();
	this.baggageClaimList = new Array();
	
	
	this.allocateToAirlines = function(_listFrom, _listTo){
		for(var i in _listFrom){
			var airlineIndex = Math.floor(this.airlines.length * i / _listFrom.length);
			this.airlines[airlineIndex][_listTo].push(_listFrom[i]);
		}
	}
	
	this.addCheckIn = function(_checkIn){
		this.checkInList.push(_checkIn);
	}
	
	this.addGate = function(_gate){
		this.gateList.push(_gate);
	}
	
	this.addBaggageClaim = function(_bagclaim){
		this.baggageClaimList.push(_bagclaim);
	}
	
	this.addCollectionPoint = function(_coll){
		this.collectionPointList.push(_coll);
	}
	
	
	
	this.Init = function(){
		this.airlines[0] = new Airline("UA Airlines");
		this.airlines[1] = new Airline("Southwest");
		this.airlines[2] = new Airline("Delta");
		this.airlines[3] = new Airline("Emirates Airlines");
		
		
		this.in_baggage = new BaggageSystem(this, "in");
		this.out_baggage = new BaggageSystem(this, "out");
		this.in_baggage.init();
		this.out_baggage.init();
		
		this.allocateToAirlines(this.checkInList, "counters");
		this.allocateToAirlines(this.gateList, "gates");
	}
	
	this.getIn = function(){
		return this.in_baggage;
	}
	
	this.getOut = function(){
		return this.out_baggage;
	}
	
	this.planeLeaves = function(_gate){
		_gate.plane = null;
	}	
	
	this.createRandomFlight = function(){
		GetRandomFrom(this.airlines).createRandomFlight(GetRandomFrom(this.airports));
	}
	
	this.checkInRandomBag = function(){
		var checkin = GetRandomFrom(GetRandomFrom(this.airlines).counters);
		if(!checkin || checkin.bags.length > 0) return;
		
		var flight = GetRandomFrom(this.airlines).getRandomIncomingFlight();
		if(!flight) return;
		
		var gate = flight.gate;
		var destinationAirport = flight.destinationAirport;
		
		var bag = new Bag();
		
		bag.init(this.getOut(), checkin, gate, destinationAirport);	
		checkin.bags.push(bag);	
	}
	
	this.Update = function()
	{
		//console.log("Update airport");	
		this.in_baggage.update();
		this.out_baggage.update();
	}
	
	this.checkClick = function(_mousePos)
	{
		this.in_baggage.checkClick(_mousePos);
		this.out_baggage.checkClick(_mousePos);
	}
	
}
