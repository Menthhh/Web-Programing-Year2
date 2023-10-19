function alarm(time, text) {
    this.time = time || "";
    this.text = text || "";
}

const alarms = [

];


var mode = "view";

function start() {
    document.getElementById("btn").addEventListener("click", buttonToggle);
    document.getElementById("import").addEventListener("click", importSchedule);
    document.getElementById("save").addEventListener("click", saveSchedule);
    document.getElementById("export").addEventListener("click", exportSchedule);
    document.getElementById("btn").innerHTML = "Edit Schedule";
    document.getElementById("import").innerHTML = "Import";
    document.getElementById("save").innerHTML = "Save Schedule";
    document.getElementById("export").innerHTML = "Export Schedule";
    view();
}

function view() {

    const div = document.getElementById("divAlarm");
    div.innerHTML = "";
    
    const timeList = document.createElement("table");
    const body = document.createElement("tbody");
    const row = document.createElement("tr");

    const time = document.createElement("td");
    time.innerHTML = "Time";
    time.style.fontWeight = "bold";
    row.appendChild(time);
    const text = document.createElement("td");
    text.innerHTML = "Activity";
    text.style.fontWeight = "bold";
    row.appendChild(text);

    body.appendChild(row);
    
    for (var i = 0; i < alarms.length; i++) {
        const row = document.createElement("tr");
        
        const time = document.createElement("td");
        time.innerHTML = alarms[i].time;
        row.appendChild(time);
        
        const text = document.createElement("td");
        text.innerHTML = alarms[i].text;
        row.appendChild(text);

        body.appendChild(row);
        
    }

    timeList.appendChild(body);
    div.appendChild(timeList);
}

function edit() {
    alarms.sort(function(a, b) {
        var timeA = a.time;
        var timeB = b.time;
        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }
        return 0;
    });
    const div = document.getElementById("divAlarm");
    div.innerHTML = "";

    const timeList = document.createElement("table");
    const body = document.createElement("tbody");
    const row = document.createElement("tr");

    const time = document.createElement("td");
    time.innerHTML = "Time";
    time.style.fontWeight = "bold";
    row.appendChild(time);
    const text = document.createElement("td");
    text.innerHTML = "Alert";
    text.style.fontWeight = "bold";
    row.appendChild(text);

    body.appendChild(row);

    for (var i = 0; i < alarms.length; i++) {
        const row = document.createElement("tr");
        
        const time = document.createElement("td");
        const timeInput = document.createElement("input");
        timeInput.type = "time";
        timeInput.id = "time" + i;
        timeInput.value = alarms[i].time;
        time.appendChild(timeInput);
        row.appendChild(time);
        
        const text = document.createElement("td");
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.id = "text" + i;
        textInput.value = alarms[i].text;
        text.appendChild(textInput);
        row.appendChild(text);

        const del = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.id = i;
        delBtn.addEventListener("click", remove);
        del.appendChild(delBtn);
        row.appendChild(del);

        body.appendChild(row);
        
    }

    timeList.appendChild(body);
    div.appendChild(timeList);

    const brrr = document.createElement("br");
    div.appendChild(brrr);
    div.appendChild(brrr);

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add";
    addBtn.addEventListener("click", add);
    //class = "outerbutton"
    addBtn.className = "outerbutton";
    div.appendChild(addBtn);

}



function buttonToggle(){
    if (mode == "view") {
        mode = "edit";
        document.getElementById("btn").innerHTML = "done";
        edit();        
    } else if (mode == "edit") {
        mode = "view";
        document.getElementById("btn").innerHTML = "Edit Schedule";
        for(var i = 0; i < alarms.length; i++) {
            alarms[i].time = document.getElementById("time" + i).value;
            alarms[i].text = document.getElementById("text" + i).value;
        }
        view();
    }
}

function getCurrentDateFormatted() {
    // get the date from input date field
    const date = document.getElementById('date').value;
    return date;
}

function exportSchedule() {
    // Convert alarms array to JSON
    const jsonData = JSON.stringify(alarms, null, 2);

    // Create a Blob with JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Generate a filename based on the current date
    const filename = `${getCurrentDateFormatted()}.json`;

    // Create an <a> element to trigger the download
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = 'block';


    // Trigger the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importSchedule(event) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            try {
                const importedData = JSON.parse(content);
                // Merge the imported data with the existing alarms array
                alarms.push(...importedData);
                edit();
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };

        reader.readAsText(file);
    });

    // Trigger the file input dialog
    fileInput.click();
}

function saveSchedule() {
    let object = prasetoObj();
    const olddata = JSON.parse(localStorage.getItem("alertTime"));
    let savedata = alarm == null ? [] : alarm;

    if (olddata == null) {
        localStorage.setItem("alertTime", JSON.stringify(object));
        return;
    }

    for (let i = 0; i < object.length; i++) {
        if(olddata.find(x => x.time == object[i].time && x.activity == object[i].activity) != undefined){
            continue;
        }else{
            savedata.push(object[i]);
        }
    }

    localStorage.setItem("alertTime", JSON.stringify(savedata));

}


function remove() {
    alarms.splice(this.id, 1);
    edit();
}

function add() {
    alarms.push(new alarm("00:00", "New Alarm"));
    edit();
}

window.addEventListener("load", start());