let clockStart = setInterval(displayCount, 1000)
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


let counter = 0;
let timer = 0;
let min = 0;
let sec = 0;
let hr = 0;
let lap = 0;

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

logHTML.addEventListener("click",saveLapDisplay)

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
    console.log("Log", performance)
    localStorage.setItem("performance", JSON.stringify(performance));
    counter = 0;
    timer = 0;
    retriveLocalStorage()
}

function retriveLocalStorage() {
    let performance = JSON.parse(localStorage.getItem("performance")) || []
    let htmlString = ""
    htmlString += performance.map((dataentry) => {
        return (`<tr><td>${dataentry.reps}</td><td>${dataentry.timer}</td></tr>`)
    })
    // htmlString += "</ul>"
    console.log(htmlString)
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
    perfHTML.innerHTML = ""
})


restartHTML.addEventListener("click", function () {
    clockStart = setInterval(displayCount, 1000)
})

function saveLap(){
  let lapLog = JSON.parse(localStorage.getItem("lapLog")) || [];
  lap++;
  lapLog.push({
      lap: lap,
      timer:timer
  })
  localStorage.setItem("lapLog",JSON.stringify(lapLog))

}



function saveLapDisplay() {
    let lapLog = JSON.parse(localStorage.getItem("lapLog")) || []
    let htmlString = ""
    htmlString += lapLog.map((dataentry) => {
        return (`<tr><td>${dataentry.lap}</td><td>${dataentry.timer}</td></tr>`)
    })
    // htmlString += "</ul>"
    console.log(htmlString)
    lapDispHTML.innerHTML = htmlString
}

saveLap()
retriveLocalStorage()