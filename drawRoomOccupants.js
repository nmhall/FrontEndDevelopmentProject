var rooms = document.getElementsByTagName('area');

// We will demo under the assumption that Junior number 20 is logged in.
var studentPriorityLevel = 'Junior';
var studentPriorityNumber = 20;

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
    roomInfo = roomsDB({'id': id}).first();
    if (roomInfo.occupied) {
        if (isHigherPriorityLevel(roomInfo.priorityLevel, studentPriorityLevel)) {
            lockedDiv.style.zIndex = '1';
        } else if (roomInfo.priorityLevel == studentPriorityLevel
                   && roomInfo.priorityNumber > studentPriorityNumber) {
            lockedDiv.style.zIndex = '1';
        } else {
            occDiv.style.zIndex = '1';
        }
    }
}

function putStudentInRoom(id) {
    return function(){
        roomInfo = roomsDB({'id': id}).first();
        if (roomInfo.occupied) {
            if (isHigherPriorityLevel(roomInfo.priorityLevel, studentPriorityLevel)) {
                alert('This room is taken with a higher priority: ' + roomInfo.priorityLevel
                       + ' ' + roomInfo.priorityNumber + '. It is currently occupied by '
                       + roomInfo.occupant1 + '.');
            } else if (roomInfo.priorityLevel == studentPriorityLevel
                       && roomInfo.priorityNumber > studentPriorityNumber) {
                alert('This room is taken with a better number: ' + roomInfo.priorityLevel
                       + ' ' + roomInfo.priorityNumber);
            } else {
                alert('Congratulations! You have taken this room.');
            }
        } else {
            alert('Congratulations! You have taken this room.');
        }
    }
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

