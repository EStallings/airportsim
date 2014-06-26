function DrawableObject()
{
	this.pos = new Point(0,0);
	this.width = null;
	this.height= null; 
	this.radialWidth = null;
	
	this.init = function(_posPoint)
	{
		this.initDrawableObject(_posPoint);
	}
	
	this.initDrawableObject = function( _posPoint)
	{
		this.pos = _posPoint;
	}
	
	this.drawTextOn = function(_text, _color, _size){
		drawText(this.pos.x-this.width/2-5, this.pos.y-this.height/2 - 15, _size, _color, _text);
	}
	
	this.drawID = function()
	{
		if(this instanceof Bag){
			mode = view.drawBagMode;
			if (mode == 0)		return;
			else if (mode == 1) this.drawTextOn(this.destination.id, "black", "7");
			else this.drawTextOn(this.id, "black", "7");
		}
		else if (this instanceof Belt) return;
		else this.drawTextOn(this.id, "white", "8");
	}
	
	this.checkCollisionBounds = function(_mousePos)
	{
		//console.log("checkCol"+_mousePos.toString()+this.pos.toString());
		if((this.pos.x - this.width) < _mousePos.x && _mousePos.x < (this.pos.x + this.width) && (this.pos.y-this.height) < _mousePos.y && _mousePos.y < (this.pos.y+this.height))
		{
			
			return true;
			
		}
		else
		{
			return false;
		}	
	}
	
	this.getPos = function(){return this.pos;}
	this.setPos = function(_pos){this.pos = _pos;}
}



drawFilledRectangle = function(_point, _width, _height,  _color)
{
	//context.transform(1,1,1,1,0,0);
	context.beginPath();
	context.fillStyle = _color;
	context.moveTo(_point.x-(_width/2),_point.y-(_height/2));
	context.lineTo(_point.x+(_width/2),_point.y-(_height/2));
	context.lineTo(_point.x+(_width/2),_point.y+(_height/2));
	context.lineTo(_point.x-(_width/2),_point.y+(_height/2));
	context.lineTo(_point.x-(_width/2),_point.y-(_height/2));
	context.closePath();
	context.fill();
}

drawStrokedRectangle = function(_point, _lineWidth,_width, _height,  _color)
{
	context.beginPath();
	context.strokeStyle = _color;
	context.lineWidth = _lineWidth;
	context.moveTo(_point.x-(_width/2),_point.y-(_height/2));
	context.lineTo(_point.x+(_width/2),_point.y-(_height/2));
	context.lineTo(_point.x+(_width/2),_point.y+(_height/2));
	context.lineTo(_point.x-(_width/2),_point.y+(_height/2));
	context.lineTo(_point.x-(_width/2),_point.y-(_height/2)); 
	context.closePath();
	context.stroke();
}


drawFilledCircle = function(_point, _rad,  _color)
{
	//context.transform(1,1,1,1,0,0);
	context.beginPath();
	context.fillStyle = _color;
	context.arc(_point.getX(), _point.getY(), _rad, 0 , Math.PI*2);  
	context.closePath();
	context.fill();
}

drawStrokedCircle = function(_point, _rad,  _width, _color)
{
	context.beginPath();
	context.strokeStyle = _color;
	context.lineWidth = _width;
	context.arc(_point.getX(), _point.getY(), _rad, 0 , Math.PI*2);  
	context.closePath();
	context.stroke();
}


drawLine = function(_point1, _point2, _width, _color) 
{
//ctx1.clearRect(0, 0, WIDTH, HEIGHT);
	context.beginPath();
	context.strokeStyle = _color;
	context.lineWidth = _width; // line color
	context.moveTo(_point1.getX(), _point1.getY());
	context.lineTo(_point2.getX(), _point2.getY());
	context.closePath();
	context.stroke();
}

drawText = function(_posx, _posy, _size, _color, _text)
{
	context.font = _size+"pt Arial";
	context.fillStyle = _color;
	context.fillText(_text, _posx, _posy);
}