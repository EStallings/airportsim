var body
var canvas; 
var context;
var config;

var canvasWidth;
var canvasHeight;

var updateCount = 0; 

var simulationTime = new Date().valueOf();
var simulationMinute = 60000;

var ispaused = false; 
var systemInterval = 30;
var systemSpeed    = 1.0;
var nextSpeed = 1.0;
var passengerFrequency = 2.0;

function init() 
{
	view = new View();
	view.init();
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET","config.xml",false);
	if (xmlhttp.overrideMimeType)   xmlhttp.overrideMimeType('text/xml');
	xmlhttp.send();
	config=xmlhttp.responseXML;
	
	airportList = new Array();
	list = config.getElementsByTagName("airport");
	for(i in list){
		if(!list[i].childNodes) break;
		name = list[i].childNodes[0].nodeValue;
		airportList[i] = name;
	}
	airport = new Airport();
	airport.Init();
	airport.id = "DIA";
	
	UpdateLoop();
	
	
}


function UpdateRestart(){
	setTimeout(UpdateLoop, systemInterval);
}

function UpdateLoop()
{
	//console.log("updates " + updateCount);	
	//updateCount++;
	//console.log(ispaused);
	systemSpeed = nextSpeed;
	if (!ispaused)
	{
		airport.Update();
		//console.log("Updating and simulating airport.");
		simulate();
	}
	view.draw();
	UpdateRestart();
}

//Using setTimeout etc uses system clock - we need local clock for time scaling!
var callLaterQueue = new Array();
function CallLater(_function, _timeout){
	callLaterQueue.push([_function, _timeout]);
}

function simulate(){
	var timeStep = (systemInterval * systemSpeed * 50);
	simulationTime += timeStep;
	//Call any callLaters
	
	for(i in callLaterQueue){
		if(callLaterQueue[i][1] <= 0) {
			callLaterQueue[i][0]();
			delete callLaterQueue[i];
		}
		else callLaterQueue[i][1]-= timeStep;
	}
	
	//Randomly generate bags at check in counters
	
	if( Math.floor(Math.random()*10/passengerFrequency) <1  )
	{
		airport.checkInRandomBag();
	}
	//Randomly generate plane
	
	if(Math.floor(Math.random()*201)<1){
		randomPlaneArrival();
	}

}

// gets its own function so it can be called independently of the simulation
function randomPlaneArrival(){
	airport.createRandomFlight();
}


CallAll = function(_array,_function){
	for(i in _array){
		_array[i][_function]();
	}
}

GetRandomFrom = function(_array){
	if(_array.length == 0) return null;
	return _array[Math.floor(Math.random()*(_array.length))];
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


GetCopyOfArray = function(_array){
	var ret = new Array();
	for(i in _array){
		ret[i] = _array[i];
	}
	return ret;
}
