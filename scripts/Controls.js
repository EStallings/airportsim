var keyQueue= new Array();
function key(evt){
	var c = evt.keyCode;
	var type;
	if(evt.type == 'keyup') type = 'up';
	else type = 'down';
	
	var partial = keyQueue[type];
	if(!partial) return;
	for(k in partial[c]){
		partial[c][k]();
	}
}

function registerForKey(key,fn,updown){
	if(!keyQueue[updown]) keyQueue[updown] = new Array();
	if(!keyQueue[updown][key]) keyQueue[updown][key] = new Array();
	keyQueue[updown][key].push(fn);
}


pauseSimulation = function(){ispaused = !ispaused; }
	
	//These are handled twice. So I give them a name.
zoomIn = function(){ view.zoom(1);}
zoomOut = function(){ view.zoom(-1);}

speedUp = function(){ 
	nextSpeed -=.1; 
	if(nextSpeed <= 0.1) nextSpeed = 0.1;
}
speedDown = function(){ 
	nextSpeed += .1; 
	if(nextSpeed > 1.5) nextSpeed = 1.5;
}
passFreq = function(mod){
	passengerFrequency += mod;
}

var dragStart,dragged, endDragged;
var scaleFactor = 1.1;

function onMouseDown(evt){
	document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
	view.lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	view.lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragStart = context.transformedPoint(view.lastX,view.lastY);
	dragged = false;
	
	
}

function onMouseMove(evt){
	view.lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	view.lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragged = true;
	
	var mx = evt.pageX - canvas.offsetLeft;
	var my = evt.pageY - canvas.offsetTop;
	
	if (dragStart){
		var pt = context.transformedPoint(view.lastX,view.lastY);
		//context.translate(pt.x-dragStart.x,pt.y-dragStart.y);
		view.translate(pt.x-dragStart.x,pt.y-dragStart.y)
		view.updateMousePos(0,0);
		endDragged = true; 
	}
	view.updateMousePos(mx - view.mousePos.x, my - view.mousePos.y);
	/*
	else
	{
		if(endDragged)
		{
			view.updateMousePos(0,0);
			endDragged = false; 
		}
		else
		{
			view.updateMousePos(mx - view.mousePos.x, my - view.mousePos.y);
		}	
	}
	*/
}



function onMouseUp(evt){
	dragStart = null;
	if (!dragged)
	{
		airport.checkClick(view.mousePos);
		view.checkClick();
	}
}

var handleScroll = function(evt){
	var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
	if (delta) view.zoom(delta);
	return evt.preventDefault() && false;
}

var showInstructions = true;
function toggleInstructions(){
	showInstructions = !showInstructions;
	opac = (showInstructions) ? 0.8 : 0;
	document.getElementById("Instructions").style.opacity = opac;
}	

function giveControls(){
	canvas.addEventListener('mousedown',onMouseDown,false);
	canvas.addEventListener('mousemove',onMouseMove,false);
	canvas.addEventListener('mouseup',onMouseUp,false);
	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
	canvas.addEventListener('mousewheel',handleScroll,false);
	window.addEventListener("keydown", key, false);
	window.addEventListener("keyup", key, false);
	window.addEventListener("keypress", key, false);
	
	
	registerForKey(32,  pauseSimulation, 'up'); //Spacebar
	registerForKey(107, zoomIn, 'down');  //Plus key
	registerForKey(187, zoomIn, 'down');  //Plus key	
	registerForKey(109, zoomOut, 'down'); //Minus key	
	registerForKey(189, zoomOut, 'down'); //Minus key	
	registerForKey(219, speedDown, 'down'); // [ key
	registerForKey(221, speedUp, 'down');   // ] key
	registerForKey(83, randomPlaneArrival, 'up');  //s
	registerForKey(65, function(){passFreq(1)}, 'down'); // a
	registerForKey(90, function(){passFreq(-1)}, 'down'); //z
	registerForKey(88, function(){view.drawBagMode = (view.drawBagMode +1)%3;}, 'down'); //x
	registerForKey(37, function(){view.translate(10, 0);}, 'down');//37 leftarrow
    registerForKey(38, function(){view.translate(0, 10);}, 'down');//38 uparrow
    registerForKey(39, function(){view.translate(-10,0);}, 'down');//39 rightarrow
	registerForKey(40, function(){view.translate(0,-10);}, 'down');//40 downarrow
	registerForKey(73, toggleInstructions, 'down');   // i key
}