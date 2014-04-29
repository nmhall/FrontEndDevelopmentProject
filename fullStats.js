window.onload = function(){
	var statCategories = ['atwood', 'brighton','case', 'east', 'linde', 'north', 'sontag', 'south', 'west']
	for(var dorm = 0; dorm < statCategories.length; dorm++){

		var currentDormLoc = statCategories[dorm];
		console.log(currentDormLoc);


		var singles = getAllRoomsByLocationAndType(currentDormLoc, 'single');
		var doubles = getAllRoomsByLocationAndType(currentDormLoc, 'double');
		var triples = getAllRoomsByLocationAndType(currentDormLoc, 'triple');
		var quads = getAllRoomsByLocationAndType(currentDormLoc, 'quad');
		console.log(singles)

	if (singles.length != 0)
	{
		document.getElementById(currentDormLoc + 'Singles').innerHTML = singles.length
		document.getElementById(currentDormLoc + 'OpenSingles').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"single").length;
	}
	else
	{
		document.getElementById(currentDormLoc + 'OpenSingles').innerHTML = "0";
	}
	
	if (doubles.length != 0)
	{
		document.getElementById(currentDormLoc + 'Doubles').innerHTML = doubles.length
		document.getElementById(currentDormLoc + 'OpenDoubles').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"double").length;
	}
	else
	{
		document.getElementById(currentDormLoc + 'OpenDoubles').innerHTML = "0";
	}

	if (triples.length != 0)
	{
		document.getElementById(currentDormLoc + 'Triples').innerHTML = triples.length
		document.getElementById(currentDormLoc + 'OpenTriples').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"triple").length;
	}
	else
	{
		document.getElementById(currentDormLoc + 'OpenTriples').innerHTML = "0";
	}

	if (quads.length != 0)
	{
		document.getElementById(currentDormLoc + 'Quads').innerHTML = quads.length
		document.getElementById(currentDormLoc + 'OpenQuads').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"quad").length;
	}
	else
	{
		document.getElementById(currentDormLoc + 'OpenQuads').innerHTML = "0";
	}

}

	
		var singles = getAllSingles();
		var doubles = getAllDoubles();
		var triples = getAllTriples();
		var quads = getAllQuads();

		document.getElementById('allSingles').innerHTML = singles.length
		document.getElementById('allOpenSingles').innerHTML = getUnoccupiedRoomsByType("single").length;
		document.getElementById('allDoubles').innerHTML = doubles.length
		document.getElementById('allOpenDoubles').innerHTML = getUnoccupiedRoomsByType("double").length;
		document.getElementById('allTriples').innerHTML = triples.length
		document.getElementById('allOpenTriples').innerHTML = getUnoccupiedRoomsByType("triple").length;
		document.getElementById('allQuads').innerHTML = quads.length
		document.getElementById('allOpenQuads').innerHTML = getUnoccupiedRoomsByType("quad").length;
	

    document.getElementById("backButton").addEventListener("click", function(){ document.location = "FrontPageAllDorms.html";});
}