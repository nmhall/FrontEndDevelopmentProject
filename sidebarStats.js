var pathArray = window.location.pathname.split( '/' );
var currentFile = pathArray[pathArray.length - 1];
var currentDormLoc = currentFile.substring(0, 
	currentFile.indexOf('.html')-3);
console.log(currentDormLoc);
var dormDB = getRoomsInDorm(currentDormLoc);

var singles = dormDB().filter({'numOccupants': 1});
var doubles = dormDB().filter({'numOccupants': 2});
var triples = dormDB().filter({'numOccupants': 3});
var quads = dormDB().filter({'numOccupants': 4});

if singles.length != 0
{
	document.getElementById('openSinglesNum').innerHTML = toString(singles().filter({occupied:false}).get().count());
	document.getElementById('singlesNum').innerHTML = toString(singles.get().count());
}
else
{
	document.getElementById('openSingles').innerHTML = "";
}
/*
if soubles.length != 0
{
	document.getElementById('openDoubles').innerHTML = "";
}

if triples.length != 0
{

	document.getElementById('openTriples').innerHTML = "";
}

if quads.length != 0
{
	document.getElementById('openQuads').innerHTML = "";
}*/


