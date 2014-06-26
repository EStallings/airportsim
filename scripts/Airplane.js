function Airplane(_gate, _departingTime, _storageHold, _flightID, _airline, _destinationAirport){
	this.departingTime = _departingTime;
	this.storageHold = _storageHold;
	this.gate = _gate;
	this.flightID = _flightID;
	this.airline = _airline;
	this.destinationAirport = _destinationAirport;
	
	this.arrive = function(_arrivalTime){
		var that = this;
		CallLater(function(){that.land()}, _arrivalTime - simulationTime );
		
	}
	
	this.land = function(){
		this.gate.collectionPoint.giveAll(this.storageHold);
		this.gate.planeDocked = true;
		this.airline.notifyFlightLanded(this.flightID);
		
		
		//alert("Plane at: " + this.gate.id + " arrived");
		var that = this;
		CallLater(function(){that.depart() }, this.departingTime - simulationTime);

	}
	
	this.depart = function(){
		//Notify gate it no longer can function and depart (delete self)
		//alert("Plane at: " + this.gate.id + " LEFT");
		this.gate.planeDocked = false;
		delete(this.storageHold);
		this.airline.notifyFlightLeft(this.flightID);
	}
}
