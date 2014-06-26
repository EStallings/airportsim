//Courtesy Gavin Kistner, http://phrogz.net/tmp/canvas_zoom_to_cursor.html
//Found via StackExchange
function trackTransforms(context){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	context.getTransform = function(){ return xform; };
	
	var savedTransforms = [];
	var save = context.save;
	context.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(context);
	};
	var restore = context.restore;
	context.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(context);
	};

	var scale = context.scale;
	context.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(context,sx,sy);
	};
	var rotate = context.rotate;
	context.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(context,radians);
	};
	var translate = context.translate;
	context.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(context,dx,dy);
	};
	var transform = context.transform;
	context.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(context,a,b,c,d,e,f);
	};
	var setTransform = context.setTransform; 
	context.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(context,a,b,c,d,e,f);
	};
	var pt  = svg.createSVGPoint();
	
	context.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		
		
		return pt.matrixTransform(xform.inverse());
	}
}



function View(){
	this.drawableObjects = new Array();
	this.drawableBagObjects = new Array();
	this.drawbleWorkers = new Array();
	
	this.drawNodeMode = 0;
	this.drawBagMode = 0;
	this.impulseX = 0;
	
	this.lastX = 0;
	this.lastY = 0;
	
	this.tOffset = new Point(0,0); //transform offset
	this.tZoom = new Point(1,1); //transform zoom  \
	
	this.mousePos = new Point(0,0);
	

	this.mouseRad = 5; 

	this.draw = function()
	{	
		this.lastX = (canvas.width/2) + this.impulseX;
		this.lastY = canvas.height/2;
		
		var p1 = context.transformedPoint(0,0);
		var p2 = context.transformedPoint(canvas.width,canvas.height);
		context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y); //This method prevents artifacts due to moving the context around
		
		
		CallAll(this.drawableObjects, "drawSelf");
		CallAll(this.drawableBagObjects, "drawSelf");
		CallAll(this.drawbleWorkers, "drawSelf");
		CallAll(this.drawableBagObjects, "drawID");
		CallAll(this.drawableObjects, "drawID");
		CallAll(this.drawbleWorkers, "drawID");
		
		drawText(p1.x+ 100, p1.y+ 90, "8", "white", this.impulseX);
		drawText(p1.x+ 100, p1.y+ 100, "8", "white", "" + systemSpeed + "," + passengerFrequency + ",   " + new Date(simulationTime));
		drawText(p1.x+ 100, p1.y + 110, "8", "white", this.drawBagMode);
		
		this.drawMouse();
		
		//drawStrokedCircle(new Point(0,0), 100,  2, "#ff0");
		//drawStrokedCircle(new Point(500,500), 2,  2, "#ff0");
	}
	
	this.drawMouse = function()
	{
		drawStrokedCircle(this.mousePos, this.mouseRad,  2, "#ff0");
	}

	this.translate = function(_x,_y)
	{
		context.translate(_x,_y);
		//this.tOffset.x -= _x/this.tZoom.x;
		//this.tOffset.y -= _y/this.tZoom.y;
	}

	this.updateMousePos = function(_x,_y)
	{
		this.mousePos.x += _x;
		this.mousePos.y += _y; 
		//console.log(this.mousePos.toString());
		
		
	}
	
	this.zoom = function(_clicks){
		var pt = context.transformedPoint(this.lastX,this.lastY);
		context.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,_clicks);
		context.scale(factor,factor);
		//this.tZoom.x *= factor; 
		//this.tZoom.x *= factor;
		
		context.translate(-pt.x,-pt.y);
	}
	
	this.transformPoint = function(_x, _y)
	{
		//console.log(_x+","+_y);
		var zeroPoint = context.transformedPoint(0,0);
		var point = context.transformedPoint(_x, _y);
		console.log(zeroPoint.x+","+zeroPoint.y+" "+point.x+","+point.y+" "+_x+","+_y );
		//var point = new Point(_x, _y);
		//console.log(point.toString());
		//point.x += this.tOffset.x*this.tZoom.x;
		//point.y += this.tOffset.y*this.tZoom.y;
		//console.log(point.toString())
		
		return point;	
	}
	
	this.addDrawableObject = function(_drawableObject)
	{
		this.drawableObjects[this.drawableObjects.length] = _drawableObject;		
	}
	this.addDrawableWorker = function(_drawableWorker)
	{
		this.drawbleWorkers[this.drawbleWorkers.length] = _drawableWorker;		
	}
	this.addBagDrawableObject = function(_bag)
	{
		this.drawableBagObjects[_bag.id] = _bag;
	}
	
	
	this.init = function(){
		canvas = document.getElementById("MainCanvas");
		body = document.getElementById("body");
		context = canvas.getContext("2d");
		trackTransforms(context);
		canvas.width 	= 1920;
		canvas.height	= 1080;
		giveControls();
	}
	
	this.checkClick = function()
	{
		var bags = this.drawableBagObjects;
		for(b in bags)
		{
			bags[b].checkClick(this.mousePos);	
		}
	}
}