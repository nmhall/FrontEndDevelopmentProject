// Sets up the code required to handle queries to the Mongo database
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var connect = require('connect');

var dbURL = 'mongodb://RoomDraw:password1@ds063287.mongolab.com:63287/roomdraw';
mongoose.connect(dbURL);

var roomSchema = mongoose.Schema({
    roomID: String,
    numOccupants: Number,
    pullRooms: String,
    occupant1: String,
    occupant2: String,
    occupant3: String,
    occupant4: String,
    priorityLevel: String,
    priorityNumber: Number,
    srRound: Number
});

var Room = mongoose.model('Room', roomSchema);

app.use(connect.cookieParser());
app.use(connect.bodyParser());

app.get('/getRooms', function(request, response){
    occupiedRooms = Room.find({'occupied': true}, function(err, docs){
        alert('Ping!');
        response.send(docs);
    });
});

app.post('/addToRoom', function(request, response){
    var roomID = request.body.roomID;
    var priorityLevel = request.body.priorityLevel;
    var priorityNumber = request.body.priorityNumber;
    var occ1 = request.body.occ1;
    var occ2 = request.body.occ2;
    var occ3 = request.body.occ3;
    var occ4 = request.body.occ4;
    if (occ2 == '') {
        occ2 = null;
    }
    if (occ3 == '') {
        occ3 = null;
    }
    if (occ4 == '') {
        occ4 = null;
    }
    seniorRound = request.body.seniorRound;
    if (seniorRound == 0) {
        seniorROund = null;
    }
    Room.udpate({'roomID': roomID}, {occupant1: occ1,
                                     occupant2: occ2,
                                     occupant3: occ3,
                                     occupant4: occ4,
                                     priorityLevel: priorityLevel,
                                     priorityNumber: priorityNumber,
                                     srRound: seniorRound});
});

app.listen(port);
