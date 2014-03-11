var occupancies = {};
// Hard-coded occupancies for Atwood, not a long-term solution
occupancies['atwood103'] = 'Locked';
occupancies['atwood105'] = 'Locked';
occupancies['atwood109'] = 'Open';
occupancies['atwood111'] = 'Open';
var rooms = document.getElementsByTagName('area');

for(var i = 0; i < rooms.length; i++) {
    rooms[i].addEventListener('click', displayRoomStatus, false);
    var id = rooms[i].id;
    // Concatenate '-occupied' and '-locked' to get occupancy image ids
    var occId = id + '-occupied';
    var lockedId = id + '-locked';
    occDiv = document.getElementById(occId);
    lockedDiv = document.getElementById(lockedId);
    if (occDiv) {
        occDiv.addEventListener('click', displayOccupiedRoomStatus, false);
    }
    if (lockedDiv) {
        lockedDiv.addEventListener('click', displayOccupiedRoomStatus, false);
    }
}

function displayRoomStatus() {
    var roomId = this.id;
    if (occupancies[roomId] == 'Locked') {
        alert('This room is currently taken by a number with higher priority.');
    }
    else if (occupancies[roomId] == 'Open') {
        alert('This room is currently taken, but by a number with lower priority. You may take it if you wish.');
    }
    else {
        alert('This room is currently empty. You may take it if you wish.');
    }
}

function displayOccupiedRoomStatus() {
    var id = this.id;
    var roomId = id.split('-')[0];
    if (occupancies[roomId] ==  'Locked') {
        alert('This room is currently taken by a number with higher priority.');
    }
    else if (occupancies[roomId] == 'Open') {
        alert('This room is currently taken, but by a number with lower priority. You may take it if you wish.');
    }
    else {
        alert('This room is currently empty. You may take it if you wish.');
    }
}
