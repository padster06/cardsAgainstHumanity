let joinHTLM;

function init() {
    joinHTLM = document.getElementById("join-room");
    joinHTLM.style.display = "none";
    document
        .getElementById("join-dim")
        .addEventListener("click", (e) => e.preventDefault());
}

function uHideJoin() {
    joinHTLM.style.display = "block";
}

function joinRoom() {
    joinHTLM.style.display = "none";
}
