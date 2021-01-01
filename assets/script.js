let clockStart = setInterval(displayCount,1000)
let countHTML = document.getElementById("count");
let test1HTML = document.getElementById("test1");
let test2HTML = document.getElementById("test2");
let logHTML = document.getElementById("logentry");
let perfHTML = document.getElementById("performanceLog")
let stopHTML = document.getElementById("stoptimer");
let resetCountHTML = document.getElementById("resetCount");
let clearLogHTML = document.getElementById("clearLog")

let counter = 0;
let timer=0;

function displayCount(){
 test2HTML.innerText = timer;   
 timer++;
}

stopHTML.addEventListener("click",stopTimer)

countHTML.addEventListener("click",function(){
    counter++;
    test1HTML.innerText = counter
})

logHTML.addEventListener("click",saveToLocalStorage)

function saveToLocalStorage(){
    let performance = JSON.parse(localStorage.getItem("performance")) || []
    performance.push({
        reps:counter,
        timer:timer
    })
    console.log("Log",performance)
    localStorage.setItem("performance",JSON.stringify(performance))
    retriveLocalStorage()
}

function retriveLocalStorage(){
    let performance = JSON.parse(localStorage.getItem("performance")) || []
    let htmlString = "<ul>"
    htmlString += performance.map((dataentry) => {
        return(`<li>Counts:${dataentry.reps} Time:${dataentry.timer}</li>`)
    })
    htmlString += "</ul>"
    console.log(htmlString)
    perfHTML.innerHTML = htmlString
}

function stopTimer(){
    clearInterval(clockStart)
}


resetCountHTML.addEventListener("click",function(){
    counter = 0;
    timer = 0;
    test1HTML.innerText = counter
    test2HTML.innerText = timer;  
})

clearLogHTML.addEventListener("click",function(){
    localStorage.removeItem("performance");
    perfHTML.innerHTML =""
})


retriveLocalStorage()