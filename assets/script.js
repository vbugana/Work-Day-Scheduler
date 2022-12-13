// time variable store and loop through scheduler
var myDay = [
    {
        id: "0",
        hour: "9",
        time: "9",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "PM",
        reminder: ""
    },
    
]

//  data for the header date
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// data saved to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getHeaderDate();

// creates the visuals for the scheduler body
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})