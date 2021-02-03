// Global Variables

//This can be uncommented if you want the timer running on page load
// let clockStart = setInterval(displayCount, 1000) 
let clockStart;
let countHTML = document.getElementById("count");
let test1HTML = document.getElementById("test1");
let test2HTML = document.getElementById("test2");
let logHTML = document.getElementById("logentry");
let perfHTML = document.getElementById("performanceLog")
let stopHTML = document.getElementById("stoptimer");
let resetCountHTML = document.getElementById("resetCount");
let clearLogHTML = document.getElementById("clearLog")
let restartHTML = document.getElementById("restarttimer")
let lapDispHTML = document.getElementById("lapsDisplay");

// Timer Section
let startWatchHTML = document.getElementById("startwatch");
let stopWatchHTML = document.getElementById("stopwatch");
let secondtimerCountHTML = document.getElementById("secondtimercount");
let minutetimerCountHTML = document.getElementById("minutetimercount");
let hourtimerCountHTML = document.getElementById("hourtimercount");
let stopWatchDisplay = document.getElementById("stopwatchdisplay");
let modalHTML = document.querySelectorAll(".stopTimer")


let totalseconds = 0;
let minuteObject = 0;
let minute = 0;


let counter = 0;
let timer = 0;
let min = 0;
let sec = 0;
let hr = 0;
let lap = 0;
let stopWatchCount = 0;
let stopWatchTimer;
let d1;
let d2;

function displayCount() {
    let dsecs;
    let dmins;
    let dhours;


    timer++;
    if (timer === 60) {
        min++;
        timer = 0
    }
    if (min === 60) {
        hr++;
        min = 0;
    }
    if (timer < 10) {
        dsecs = "0" + timer;
    }
    else {
        dsecs = timer
    }
    if (min < 10) {
        dmins = "0" + min;
    }
    else {
        dmins = min;
    }
    if (hr < 10) {
        dhours = "0" + hr
    }
    else {
        dhours = hr
    }
    test2HTML.innerText = `${dhours} : ${dmins} : ${dsecs}`;
}

stopHTML.addEventListener("click", stopTimer)

countHTML.addEventListener("click", function () {
    counter++;
    test1HTML.innerText = counter
})

logHTML.addEventListener("click", saveLap)

function saveToLocalStorage() {
    let performance = JSON.parse(localStorage.getItem("performance")) || []
    if (timer < 10) {
        dsecs = "0" + timer;
    }
    else {
        dsecs = timer
    }
    if (min < 10) {
        dmins = "0" + min;
    }
    else {
        dmins = min;
    }
    if (hr < 10) {
        dhours = "0" + hr
    }
    else {
        dhours = hr
    }
    performance.push({
        reps: counter,
        timer: `${dhours} : ${dmins} : ${dsecs}`
    })
    // console.log("Log", performance)
    localStorage.setItem("performance", JSON.stringify(performance));
    counter = 0;
    timer = 0;
    retriveLocalStorage()
}

function retriveLocalStorage() {
    let performance = JSON.parse(localStorage.getItem("performance")) || []
    let htmlString = ""
    for (let i = 0; i < performance.length; i++) {
        htmlString = htmlString + `<tr><td>${performance[i].reps}</td><td>${performance[i].timer}</td></tr>`
    }
    // console.log(htmlString)
    perfHTML.innerHTML = htmlString
}

function stopTimer() {
    clearInterval(clockStart)
}


resetCountHTML.addEventListener("click", function () {
    saveToLocalStorage()
    counter = 0;
    timer = 0;
    min = 0;
    sec = 0;
    hr = 0;
    test1HTML.innerText = counter
    test2HTML.innerText = timer;
})

clearLogHTML.addEventListener("click", function () {
    localStorage.removeItem("performance");
    localStorage.removeItem("lapLog")
    perfHTML.innerHTML = ""
    lapDispHTML.innerHTML = ""
})


restartHTML.addEventListener("click", function () {
    timer = 0;
    if (clockStart) clearInterval(clockStart)
    // console.log("Start/restart")
    clockStart = setInterval(displayCount, 1000)
})

function saveLap() {
    let lapLog = JSON.parse(localStorage.getItem("lapLog")) || [];
    lap++;
    if (timer < 10) {
        dsecs = "0" + timer;
    }
    else {
        dsecs = timer
    }
    if (min < 10) {
        dmins = "0" + min;
    }
    else {
        dmins = min;
    }
    if (hr < 10) {
        dhours = "0" + hr
    }
    else {
        dhours = hr
    }
    lapLog.push({
        lap: lap,
        timer: `${dhours} : ${dmins} : ${dsecs}`
    })
    localStorage.setItem("lapLog", JSON.stringify(lapLog))
    saveLapDisplay()
}



function saveLapDisplay() {
    let lapLog = JSON.parse(localStorage.getItem("lapLog")) || []
    let htmlString = ""

    for (let i = 0; i < lapLog.length; i++) {
        htmlString = htmlString + `<tr><td>${lapLog[i].lap}</td><td>${lapLog[i].timer}</td></tr>`
    }
    // console.log(htmlString)
    lapDispHTML.innerHTML = htmlString
}

startWatchHTML.addEventListener("submit", function (event) {
    event.preventDefault()
    minute = parseInt(minutetimerCountHTML.value) || 0;
    second = parseInt(secondtimerCountHTML.value) || 0;
    hour = parseInt(hourtimerCountHTML.value) || 0;
    d1 = new Date();
    d2 = new Date(d1);
    console.log(d1.getSeconds() + second,d1.getMinutes() + minute,d1.getHours() + hour)
    if (d1.getSeconds() + second > 59){
        minute++;
    }
    if(d1.getMinutes() + minute > 59){
        hour++
    }
    d2.setSeconds(d1.getSeconds() + second)
    d2.setMinutes(d1.getMinutes() + minute)
    d2.setHours(d1.getHours() + hour)

    // console.log(d1,d2,minute,second,hour)
    $("#Modal").modal("show")
    modalHTML[0].textContent = d1.toLocaleTimeString()
    modalHTML[1].textContent = d2.toLocaleTimeString()
    clearInterval(stopWatchTimer)
    stopWatchTimer = setInterval(displayStopWatch, 1000)

})

function displayStopWatch() {
    // console.log(d1,d2);
    d1 = new Date();
    modalHTML[0].textContent = d1.toLocaleTimeString()
    
    if (d1 >= d2) {
        clearInterval(stopWatchTimer)
        const divEle = document.getElementById("stopTimer")
        const HTMLele = document.createElement("audio")
        HTMLele.setAttribute("src","./assets/sounds.mp4")
        HTMLele.setAttribute("loop",true)
       divEle.appendChild(HTMLele);
       divEle.children[0].play();
       const closeEle = document.querySelector(".btn-close")
       closeEle.addEventListener("click", function(){
           divEle.children[0].setAttribute("src","");
       })
       console.log(divEle)
    }
}


function displayMinute() { 
    document.getElementById("minute").innerText = minute;
    if (minute === 0) {
        alert("Timer Done")
        clearInterval(minuteObject)
    }
    else {
        minute--
    }

}

function today() {
    let now = document.getElementsByClassName("now")
    let day = new Date()
    now[0].textContent = day.toLocaleDateString();
    now[1].textContent = day.toLocaleTimeString()
}

stopWatchHTML.addEventListener("click", function () {
    if (d1 === d2) {
        alert("Timer done!!!");
        d1 = ""
        d2 = ""
    }
})

saveLapDisplay()
retriveLocalStorage()
let currentDay = setInterval(today, 1000);


//  d1 = new Date ()
//     d2 = new Date ( d1 );
// d2.setMinutes ( d1.getMinutes() + 30 );
// alert ( d2 );