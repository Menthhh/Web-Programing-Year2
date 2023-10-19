var hour = 8;
var minute = 59;
var second = 55;
var AlertTime = {
    "09:00:00": "Wakeup",
    "11:05:00": "Lunch time",
    "15:30:00": "Take a break",

};

function createMainPageTable() {
    // Get a reference to the table element in the main page
    var mainPageTable = document.getElementById("data_table");

    // Create table headers
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var timeHeader = document.createElement("th");
    timeHeader.textContent = "Time";
    var alertWordHeader = document.createElement("th");
    alertWordHeader.textContent = "Alert Word";
    
    headerRow.appendChild(timeHeader);
    headerRow.appendChild(alertWordHeader);
    thead.appendChild(headerRow);
    
    mainPageTable.appendChild(thead);

    // Create table body
    var tbody = document.createElement("tbody");
    
    // Loop through the AlertTime array and populate the table
    for (var time in AlertTime) {
        if (AlertTime.hasOwnProperty(time)) {
            var alertWord = AlertTime[time];
            var row = document.createElement("tr");

            var timeCell = document.createElement("td");
            timeCell.textContent = time;

            var alertWordCell = document.createElement("td");
            alertWordCell.textContent = alertWord;

            row.appendChild(timeCell);
            row.appendChild(alertWordCell);

            tbody.appendChild(row);
        }
    }

    mainPageTable.appendChild(tbody);
}

function displayTime() {
    setInterval(update_time, 1000); // Update time every second
}

function update_time() {
    
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hour++;
        minute = 0;
    }
    if (hour == 24) {
        hour = 0;
    }

    // Format the time and update the HTML
    var time = `current Time (100000x) faster ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    document.getElementById("current_time").innerHTML = time;
    console.log(time);
    console.log(typeof time);
    
    let time_digit = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    
    //

    if (time_digit in AlertTime) {
        console.log(AlertTime[time_digit]);
        alert(AlertTime[time_digit]);
    }
}

function edit() {
    document.getElementById("mainPage").style.display = "none"; // Hide the main page
    document.getElementById("editPage").style.display = "block"; // Show the edit page

    // Get a reference to the table body in the edit page
    var editPageTableBody = document.querySelector("#editPage table tbody");

    // Clear the existing table rows
    editPageTableBody.innerHTML = "";

    // Loop through the AlertTime array and generate form fields
    for (var time in AlertTime) {
        if (AlertTime.hasOwnProperty(time)) {
            var alertWord = AlertTime[time];
            var row = document.createElement("tr");

            var timeCell = document.createElement("td");
            var timeInput = document.createElement("input");
            timeInput.setAttribute("type", "time");
            timeInput.setAttribute("value", time);
            timeCell.appendChild(timeInput);

            var textCell = document.createElement("td");
            var textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("value", alertWord);
            textCell.appendChild(textInput);

            var deleteCell = document.createElement("td");
            var deleteButton = document.createElement("input");
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("value", "delete");
            deleteButton.setAttribute("onclick", "deleteRow(this)");
            deleteCell.appendChild(deleteButton);

            row.appendChild(timeCell);
            row.appendChild(textCell);
            row.appendChild(deleteCell);

            editPageTableBody.appendChild(row);
        }
    }
}


function done() {
    document.getElementById("mainPage").style.display = "block"; // Hide the edit page
    document.getElementById("editPage").style.display = "none"; // Show the main page

    // Update the AlertTime array and the data table in the main page
    updateAlertTime();
    updateMainPageTable();
}


function updateMainPageTable() {
    // Get a reference to the table body in the main page
    var mainPageTableBody = document.querySelector("#data_table tbody");

    // Clear the existing table rows
    mainPageTableBody.innerHTML = "";

    // Loop through the AlertTime array and populate the main page table
    for (var time in AlertTime) {
        if (AlertTime.hasOwnProperty(time)) {
            var alertWord = AlertTime[time];
            var row = document.createElement("tr");

            var timeCell = document.createElement("td");
            timeCell.textContent = time;

            var alertWordCell = document.createElement("td");
            alertWordCell.textContent = alertWord;

            row.appendChild(timeCell);
            row.appendChild(alertWordCell);

            mainPageTableBody.appendChild(row);
        }
    }
}




function deleteRow(button) {
    // Get the reference to the table row containing the button
    var row = button.parentNode.parentNode;

    // Get the reference to the table body
    var tbody = row.parentNode;

    // Check if it's the last row in the table
    if (tbody.rows.length > 1) {
        // Remove the row from the table if there's more than one row
        tbody.removeChild(row);
    } else {
        alert("Cannot delete the last row.");
    }
}

function addRow() {
    // Get the reference to the table body
    var tbody = document.querySelector("#editPage table tbody");

    // Create a new row
    var newRow = document.createElement("tr");

    // Create input fields for time and text
    var timeCell = document.createElement("td");
    var timeInput = document.createElement("input");
    timeInput.setAttribute("type", "time");
    timeCell.appendChild(timeInput);

    var textCell = document.createElement("td");
    var textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textCell.appendChild(textInput);

    // Create delete button for the new row
    var deleteCell = document.createElement("td");
    var deleteButton = document.createElement("input");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("value", "delete");
    deleteButton.setAttribute("onclick", "deleteRow(this)");
    deleteCell.appendChild(deleteButton);

    // Append cells to the new row
    newRow.appendChild(timeCell);
    newRow.appendChild(textCell);
    newRow.appendChild(deleteCell);

    // Append the new row to the table
    tbody.appendChild(newRow);
}


window.onload = function() {
    displayTime();
    createMainPageTable();
};