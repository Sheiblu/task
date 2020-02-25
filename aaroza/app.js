const moment = require("moment-timezone");
var timeZone = ["America/Costa_Rica", "Asia/Dhaka"];
var targetTime = 1577768400000;  // milliseconds 2019-12-31 11:00 pm
var timeNow = moment(Date.now());

function stopTime(){
    clearInterval(systemRun);
    console.log("Stop System");
 }

function removeItem(i) {
    // if email sent or time over then it's remove to the list
    timeZone.splice(i,1);
  }

var systemRun = setInterval(function(){ 
    timeNow = moment(Date.now());

    for(let i = 0; i<timeZone.length; i++){
        
       // Convert time Zone local now time to milliseconds 
        let nowTime = moment(timeNow.tz(timeZone[i]).format('MMMM Do YYYY, h:mm a'), "MMMM Do YYYY, h:mm a").valueOf();

        if(nowTime == targetTime){
            console.log("Sent the email to "+ timeZone[i]);
            removeItem(i);
            i--;
        } else if (nowTime > targetTime){
            removeItem(i);
            i--;
        }
    }

    if(timeZone.length == 0){  
        // Check list is empty or not. if yesthen stop the system
        stopTime();
    }
 }, 60000);

