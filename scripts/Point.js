function Point(_x,_y)
{
	this.x = _x;
	this.y = _y;
	
	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y
	}
	
	this.setX = function(_x){
		this.x = _x;
	}
	
	this.setY = function(_y){
		this.y = _y;
	}
	
	
	this.addPoint = function(_point)
	{
		this.x += _point.x;
		this.y += _point.y;
		
	}
	
	this.toString = function()
	{
		return "["+this.x+","+this.y+"]";
	}	
}

function Distance(_pointA, _pointB){
	return Math.sqrt( Math.pow(_pointA.getX() - _pointB.getX(),2) + Math.pow(_pointA.getY() - _pointB.getY(),2));	
}