
var rooms = TAFFY();	




//check the DB if the room is occupied or not
var isRoomOccupied = function(roomNumber)
{
	if(rooms({room:roomNumber}).count() > 0)
		return true;
	return false;
	
};

// add a person to the room
// WARNING: this currently contains no logic with regards to 
// partially-filled rooms, triples, quads, people not pulling anyone, 
// or pulling someone into a single. 
var addPerson = function (roomNumber, roomType, person, pull, personClass, priorityNumber)
{
  var roomOccupied = isRoomOccupied(roomNumber);
  
  if(roomOccupied)
  	rooms().remove({room:roomNumber});

  rooms.insert({room:roomNumber,type:roomType,person1:person,person2:pull,
  	class:personClass,priority:priorityNumber});
};

// check if the person is able to be added to a room
var canAddPerson = function (roomNumber, personClass, priorityNumber)
{
  if(!isRoomOccupied(roomNumber))
    return true;
  var currentRoom = rooms().filter({room:roomNumber});
  var currentPriority = currentRoom.select("priority")[0];
  var currentClass = currentRoom.select("class")[0];

  if(classAndNumToPriority(personClass,priorityNumber) < 
  		classAndNumToPriority(currentClass,currentPriority))
	return true;
  else 
  	return false;
};

var classAndNumToPriority = function(classType, priorityNumber)
{
	if(classType == "admin")
		return 0;
	else if(classType == "senior")
		return priorityNumber + 1000;
	else if(classType == "junior")
		return priorityNumber + 2000;
	else if(classType == "sophomore")
		return priorityNumber + 3000;
	else 
		alert("bad Class");
	
}

/*
var pathArray = window.location.pathname.split( '/' );
var currentFile = pathArray[pathArray.length - 1];
var currentDormLoc = currentFile.substring(0, 
	currentFile.indexOf('.html'));
console.log(currentDormLoc);
var jsonFile = $.getJSON(currentDormLoc+".json");
var jsonInfo = $.parseJSON(jsonFile);

console.log(jsonFile);
console.log(jsonInfo);*/