Router = function(_system)
{

	this.system = _system;
	
	this.calculatePath = function(currentbag)
	{
		currentbag.lost = false;
		var start = this.system.handlers[currentbag.currentHandler.getID()];
		if(!start){
			currentbag.lost = true;
			return;
		}
		var end = this.system.handlers[currentbag.destination.getID()];
		var path = this.findpath(start, end);
		return path;
	}
	
	this.findpath = function(_start, _end)
        {
		//Based on Dijkstra's algorithm
		//console.log("Finding Path from " + start.getID() + " to " + end.getID());	
		//Pepare a copy of the nodelist for modification and use in the algorithm
		var detlist = GetCopyOfArray(this.system.nodelist);
		//setup up informational arrays
		var time = new Array(detlist.length);
		var prev = new Array(detlist.length);
		//for each handler in the list preset time and previous values
		for (h in detlist)
		{
			time[detlist[h].getID()] = 1000;
			prev[detlist[h].getID()] = null;
		}
		//where the path starts time is 0
		time[_start.getID()] = 0;
		var path = new Array();
		var u = null; //variable for holding nodes that are possible paths
		var leastTime = 0; //the current least time in the time array
		while(Object.size(detlist) != 0)
		{
			//console.log("Calculating Path...")
			//for each handler in the list figure out which one has the smallest time impact
			//ie the smallest time in time[] that is still in detlist
			for(h in detlist)
			{
				var temp = detlist[h];
				if(time[temp.getID()] < leastTime)
				{
					u = detlist[h];
					leastTime = time[temp.getID()];
				}
				else if(leastTime == 0)
				{
					u = _start;
					break;
				}
			}
			detlist.splice(detlist.indexOf(u), 1); //remove the node from the list(marking as found)
			//console.log("Removing " + u.getID());
			//if u is the end point then walk through the prev list, this will be its path
			if(u.getID().indexOf(_end.getID()) > -1)
			{
				while(prev[u.getID()] != null)
				{
					path.push(u.getID());
					u = prev[u.getID()];
				}
				return path;
			}
			//if the smallest time is 1000 there is no path
			else if(time[u.getID()] == 1000) break;

			//go through u's neighbors to find times to add to the time array
			for (l in u.activeLinks)
			{	
				var outlink = u.activeLinks[l]; //check only the active links
				var alt = time[u.getID()] + outlink.time;
				//console.log("Time of " + link.getID() + " is " + link.time);
				//console.log("Alt for " + link.getID() + " is " + alt);
				//make sure the time is not infinite aka 1000
				if(alt < time[outlink.getID()])
				{
					time[outlink.getID()] = alt;
					prev[outlink.getID()] = u;
				}
			}
			//reset leastTime to infinite
			leastTime = 1000;
		}
		return null;
	}
	
}
