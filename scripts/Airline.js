function Airline(_name){
	this.gates = new Array();
	this.counters = new Array();
	
	this.flightsIncoming = new Array();
	this.flightsAtAirport = new Array();
	
	this.increment = 0;
	this.name = _name;
	
	this.generateFlightID = function(){
		return this.increment++;
	}

	
	this.getRandomIncomingFlight = function(){
		var flight = GetRandomFrom(this.flightsIncoming);
		return flight;
	}
	
	this.notifyFlightLanded = function(_flightID){
		this.flightsAtAirport[_flightID] = this.flightsIncoming[_flightID];
		delete this.flightsIncoming[_flightID]; 
	}
	
	this.notifyFlightLeft = function(_flightID){
		airplane = this.flightsAtAirport[_flightID];
		delete this.flightsAtAirport[_flightID];

		airport.planeLeaves(airplane.gate);
	}

	this.createRandomFlight = function(_airport){
		this.createFlight( GetRandomFrom(airport.baggageClaimList), GetRandomFrom(this.gates), _airport);
	}
	
	this.createFlight = function(_claim, _gate, _airport){
		if(_gate.plane) return;
		var flightID = this.generateFlightID();
		var storageHold   = new Array();
		for(var i=0;i<(Math.round(50 * (Math.random() * 2)));i++){
			bag = new Bag();
			bag.init(airport.getIn(), _gate.collectionPoint, _claim);
			bag.isGrabbed = true;
			storageHold.push(bag);
		}
		
		var airplane = new Airplane(_gate, simulationTime + 15 * simulationMinute, storageHold, flightID, this, _airport);
		_gate.plane = airplane;
		var arrivalTime = simulationTime + 15 * simulationMinute;
		airplane.arrive(arrivalTime);
		//alert("Flight created to " + _airport + " from airline " + this.name + " with id " + flightID + " using baggage claim " + _claim.id + " and gate " + _gate.id + ", arrives in " + (arrivalTime-simulationTime));
		this.flightsIncoming[flightID] = airplane;
	}
}
