window.onload = function()
{
	var pathArray = window.location.pathname.split( '/' );
	var currentFile = pathArray[pathArray.length - 1];
	var currentDormLoc = currentFile.substring(0, 
		currentFile.indexOf('.html')-3).toLowerCase();


	if (currentDormLoc.substring(0,5) == 'front')
	{
		var singles = getAllSingles();
		var doubles = getAllDoubles();
		var triples = getAllTriples();
		var quads = getAllQuads();

		document.getElementById('singlesNum').innerHTML = singles.length
		document.getElementById('openSinglesNum').innerHTML = getUnoccupiedRoomsByType("single").length;
		document.getElementById('doublesNum').innerHTML = doubles.length
		document.getElementById('openDoublesNum').innerHTML = getUnoccupiedRoomsByType("double").length;
		document.getElementById('triplesNum').innerHTML = triples.length
		document.getElementById('openTriplesNum').innerHTML = getUnoccupiedRoomsByType("triple").length;
		document.getElementById('quadsNum').innerHTML = quads.length
		document.getElementById('openQuadsNum').innerHTML = getUnoccupiedRoomsByType("quad").length;
	}
	else
	{

		var singles = getAllRoomsByLocationAndType(currentDormLoc, 'single');
		var doubles = getAllRoomsByLocationAndType(currentDormLoc, 'double');
		var triples = getAllRoomsByLocationAndType(currentDormLoc, 'triple');
		var quads = getAllRoomsByLocationAndType(currentDormLoc, 'quad');


		if (singles.length != 0)
		{
			document.getElementById('singlesNum').innerHTML = singles.length
			document.getElementById('openSinglesNum').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"single").length;
		}
		else
		{
			document.getElementById('openSingles').innerHTML = "";
		}
		
		if (doubles.length != 0)
		{
			document.getElementById('doublesNum').innerHTML = doubles.length
			document.getElementById('openDoublesNum').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"double").length;
		}
		else
		{
			document.getElementById('openDoubles').innerHTML = "";
		}

		if (triples.length != 0)
		{
			document.getElementById('triplesNum').innerHTML = triples.length
			document.getElementById('openTriplesNum').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc,"triple").length;
		}
		else
		{
			document.getElementById('openTriples').innerHTML = "";
		}

		if (quads.length != 0)
		{
			document.getElementById('quadsNum').innerHTML = quads.length
			document.getElementById('openQuadsNum').innerHTML = getUnoccupiedRoomsByLocationAndType(currentDormLoc, "quad").length;
		}
		else
		{
			document.getElementById('openQuads').innerHTML = "";
		}
	}

	document.getElementById("FullStatsButton").addEventListener("click", function(){document.location = "FullStats.html";});
}
