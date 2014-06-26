   /*contentsGen is the generic list of things a bag can contain. 
	0-16 legal items
	17-24 illegal items 
	*/
	var contentsGen = new Array("toothbrush", 
							"hairbrush",
							"clothes",
							"gameboy",
							"laptop",
							"charger",
							"space suit",
							"socks",
							"teddy bear",
							"golf shoes",
							"undies",
							"shampoo",
							"body poof",
							"lotion", 
							"sweater",
							"oxygen tank",
							"passport");
							
	var illegalContents= new Array(	"bomb",
									"turret",
									"gun",
									"knife",
									"gun powder",
									"apple computer",
									"alien eggs",
									"chloroform");
							
	/*Generates a content list of each bag with at most 5 items.
	Items get choosen randomly from the master list @contentsGen.
	There is a weight placed on getting more of the legal items 
	into the bags than illegal items. 
	*/
function buildBagContents(_bag)
	{	var bagContents = new Array();
		var contentsCounter = 0;
		//Number of legal items in array
		var legals=17; 
		//Each item will be produced at random
		var randomNum = null;
		
		
		while(contentsCounter++ <= 5){
			randomNum = Math.floor(Math.random()* 100);
			if(randomNum < 5) {
				bagContents[contentsCounter] = illegalContents[Math.floor(Math.random()* illegalContents.length)];
				//_bag.fillColor = "#800000";
			}
			else{
				bagContents[contentsCounter] = contentsGen[Math.floor(Math.random()*contentsGen.length)];
				//_bag.color = "#909040";
			}
		
		}	
	
	return bagContents;
}
							
							
