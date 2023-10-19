var hour = 8;
var minute = 59;
var second = 55;

function displayTime() {
    setInterval(update_time, 0.1); // Update time every second
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
    let AlertTime = {
        "09:00:00": "Wakeup",
        "11:05:00": "Lunch time",
        "15:30": "Take a break"
    };

    time_digit = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    console.log(time_digit);

    if (time_digit in AlertTime) {
        console.log(AlertTime[time_digit]);
        alert(AlertTime[time_digit]);
    }
}


window.onload = function() {
    displayTime();
};