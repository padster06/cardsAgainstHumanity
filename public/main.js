let joinHTLM, playingRoomHTML;
let display, canvas;
let blackBackIMG = new Image();
let whiteBackIMG = new Image();
let blackFrontIMG = new Image();
let whiteFontIMG = new Image();

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function init() {
    // blackBackIMG = new Image();
    blackBackIMG.src = "img/blackBack.png";
    whiteBackIMG.src = "img/whiteBack.png";
    blackFrontIMG.src = "img/blackFront.png";
    whiteFontIMG.src = "img/whiteFront.png";

    joinHTLM = document.getElementById("join-room");
    playingRoomHTML = document.getElementById("playing-room");
    canvas = document.getElementById("playing-canvas");
    display = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    game();
    joinHTLM.style.display = "none";
    // playingRoomHTML.style.display = "none";
    document
        .getElementById("join-dim")
        .addEventListener("click", (e) => e.preventDefault());
}

function game() {
    display.fillStyle = "#fff";
    display.fillRect(0, 0, canvas.width, canvas.height);
    display.fillStyle = "rgb(33, 37, 41)";
    display.fillRect(2, 2, canvas.width - 4, canvas.height - 4);

    //  BLACK CARDS

    display.drawImage(
        blackBackIMG,
        canvas.width / 2 - 120,
        canvas.height / 2 + 60,
        120,
        200
    );

    display.drawImage(
        blackFrontIMG,
        canvas.width / 2 + 20,
        canvas.height / 2 + 60,
        120,
        200
    );

    //  WHITE CARDS
    for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 5) * i + (canvas.width / 5 - 120) / 2;
        display.drawImage(whiteFontIMG, x, 100, 120, 200);
        display.font = "18px sans-serif";
        display.fillStyle = "#000000";
        wrapText(display, "", x + 10, 120, 120, 25);
    }
}

function uHideJoin() {
    joinHTLM.style.display = "block";
}

async function joinRoom() {
    joinHTLM.style.display = "none";
    let usrName = document.getElementById("join-username").value;
    let roomID = document.getElementById("join-room-id").value;
    let data = await postData(window.location.href + "api/join", {
        usrName,
        roomID,
    });
    if (data.roomJoined) {
        playingRoomHTML.style.display = "block";
        canvas = document.getElementById("playing-canvas");
        display = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;
        setInterval(game);
        game();
    }
    console.log(data);
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
