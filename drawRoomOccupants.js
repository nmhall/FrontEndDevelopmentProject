var roomsDB = TAFFY()

// Hard-code some placements into the database here

var rooms = document.getElementsByTagName('area');

for(var i = 0; i < rooms.length; i++) {
    var id = rooms[i].id;
    rooms[i].addEventListener('click', putStudentInRoom(id), false);
    // Concatenate '-occupied' and '-locked' to get occupancy image ids
    var occId = id + '-occupied';
    var lockedId = id + '-locked';
    occDiv = document.getElementById(occId);
    lockedDiv = document.getElementById(lockedId);
    if (occDiv) {
        occDiv.addEventListener('click', putStudentInRoom(id), false);
    }
    if (lockedDiv) {
        lockedDiv.addEventListener('click', putStudentInRoom(id), false);
    }
    lockedDiv.style.zIndex = '-1';
    occDiv.style.zIndex = '-1';
}

function putStudentInRoom(id) {
    var toReturn = function(){
        var fullName = document.getElementById('fullName').value;
        if (fullName == '') {
            alert('You must enter a name to add to the room');
            return;
        }
        var prioritySelect = document.getElementById('prioritySelect');
        var priorityLevel = prioritySelect.options[prioritySelect.selectedIndex].value;
        if (priorityLevel == 'None Selected') {
            alert('You must choose a year in order to add yourself to a room');
            return;
        }
        var priorityNumberString = document.getElementById('priorityNumber').value;
        var priorityNumber = -1;
        if(priorityNumberString != '' && priorityLevel != 'Admin') {
            priorityNumber = parseInt(priorityNumberString);
        }
        if (priorityLevel != 'Admin' && priorityNumber == -1) {
            alert('You must enter a priority number for the room');
            return;
        }
        var currentEntry = roomsDB({roomId: id});
        if (currentEntry.count() == 0) {
            alert('No current occupant, adding to room ' + id);
            roomsDB.insert({roomId: id, fullName: fullName, priorityLevel: priorityLevel, priorityNumber: priorityNumber});
            alert('You have succesfully added ' + fullName + ' to the room with priority ' + priorityLevel + ' ' + priorityNumber);
            return;
        }
        else {
            occupantInfo = currentEntry.first();
            occPriorityLevel = occupantInfo.priorityLevel;
            alert('Occupant Priority Level is ' + occPriorityLevel);
            occPriorityNumber = occupantInfo.priorityNumber;
            alert('Occupant Priority Number is ' + occPriorityNumber);
            if (isHigherPriorityLevel(occPriorityLevel, priorityLevel)) {
                alert('This room is currently taken with a higher priority: ' + occPriorityLevel + ' ' + occPriorityNumber);
                return;
            }
            else if(occPriorityLevel == priorityLevel && occPriorityNumber < priorityNumber) {
                alert('This room is currently taken with a higher priority: ' + occPriorityLevel + ' ' + occPriorityNumber);
                return;
            }
            else {
                roomsDB({roomId: id}).update({roomId: id, fullName: fullName, priorityLevel: priorityLevel, priorityNumber: priorityNumber});
                alert('You have succesfully added ' + fullName + ' to the room with priority ' + priorityLevel + ' ' + priorityNumber);
                return;
            }
        }
    }
    return toReturn;
}

// Returns true if priority is of a higher priority level than compareTo
function isHigherPriorityLevel(priority, compareTo) {
    if (priority == 'Admin') {
        if (compareTo == 'Senior' || compareTo == 'Junior' || compareTo == 'Sophomore') {
            return true;
        }
    }
    else if (priority == 'Senior') {
        if (compareTo == 'Junior' || compareTo == 'Sophomore') {
            return true;
        }
    }
    else if (priority == 'Junior') {
        if (compareTo == 'Sophomore') {
            return true;
        }
    }
    return false;
}

function displayRoomStatus() {
    var roomId = this.id;
    if (occupancies[roomId] == 'Locked') {
        alert('This room is currently taken by a number with higher priority.');
    }
    else if (occupancies[roomId] == 'Occupied') {
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
    else if (occupancies[roomId] == 'Occupied') {
        alert('This room is currently taken, but by a number with lower priority. You may take it if you wish.');
    }
    else {
        alert('This room is currently empty. You may take it if you wish.');
    }
}
