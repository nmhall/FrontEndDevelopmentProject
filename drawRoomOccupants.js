var occupancies = {};
// Hard-coded occupancies for Atwood, not a long-term solution
occupancies['atwood103'] = 'Locked';
occupancies['atwood105'] = 'Locked';
occupancies['atwood109'] = 'Open';
occupancies['atwood111'] = 'Open';
var rooms = document.getElementsByTagName('area');

for(var i = 0; i < rooms.length; i++) {
    rooms[i].addEventListener('click', displayRoomStatus, false);
}

function displayRoomStatus() {
    roomId = this.id;
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
