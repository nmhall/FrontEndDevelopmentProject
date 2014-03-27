
//establish a connection with the DB and give DB var out to use as well as dorm name/floor
var setupDB = function()
{
  var fs = require("fs");
  var http = require("http");
  var url = require("url");
  var file = "roomDraw.db";
  var exists = fs.existsSync(file);

  if(!exists) 
  {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
  }  
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var pathArray = window.location.pathname.split( '/' );
var currentFile = pathArray[pathArray.length - 1];
var currentDormLoc = currentFile.substring(0, currentFile.indexOf('.html'));
return [db, currentDormLoc];
};

//convert class to priority number for easy priority compare
// senior = 1000
// junior = 2000
// soph = 3000
// admin = 0
var classToPriority = function(personClass)
{
  if (personClass == 'admin'
    return 0;
  if (personClass == 'sophomore')
    return 3000;
  if (personClass == 'junior')
    return 2000;
  if (personClass == 'senior')
    return 1000;
};

//check the DB if the room is occupied or not
var isRoomOccupied = function(room)
{
  var data = setupDB();
  var db = data[0];
  var currentDormLoc = data[1];
  db.get("SELECT * FROM " + currentDormLoc + " WHERE room = " + room +";", var occupantClass);


  if(!occupantClass)
    return false;
  else
    return true;
  db.close();
};

// add a person to the room
// WARNING: this currently contains no logic with regards to 
// partially-filled rooms, triples, quads, people not pulling anyone, 
// or pulling someone into a single. 
var addPerson = function (room, roomType, person, pull, personClass, priority)
{
  var roomOccupied = isRoomOccupied(room);
  var data = setupDB();
  var db = data[0];
  var currentDormLoc = data[1];
  
  if(roomOccupied)
    db.run("DELETE FROM "+currentDormLoc + " WHERE room = " + room +";");

  db.run("INSERT INTO " + currentDormLoc + " (room,type, person1, person2, class, priority) VALUES (" +
         room + ","+roomType+","+person+","+pull+","+personClass+","+toString(priority)+");" );
db.close();
};

// check if the person is able to be added to a room
var canAddPerson = function (room, personClass, priority)
{
  if(!isRoomOccupied(room))
    return true;

  var data = setupDB();
  var db = data[0];
  var currentDormLoc = data[1];
  db.get("SELECT class FROM " + currentDormLoc + " WHERE room = " + room +";", var occupantClass);
  db.get("SELECT priority FROM " + currentDormLoc + " WHERE room = " + room +";", var occupantPriority);


  db.close();
  if ( priority + classToPriority(personClass) < occupantPriority + classToPriority(occupantClass))
    return true;
  else
    return false;

};

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Stuff (thing TEXT)");
  }

  var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

  //Insert random data
  var rnd;
  for (var i = 0; i &lt; 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd);
  }

  stmt.finalize();
  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
  });
});

db.close();