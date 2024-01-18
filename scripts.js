
// window.onload = createGameBoxList();

function newRosterCard() {
    let x = document.getElementById("player-search").value;
    document.getElementById("roster-section").innerHTML += 
    "<div class=\"player-card\">" + 
        "<div class=\"player-score\">" +
            "<h3 class=\"big-score\">0pts</h3>" +
        "</div>" +
        "<div class=\"player-details\">" +
            "<h4 class=\"player-name\">"+ x + "</h4>" +
            "<p class=\"player-stats\">G, A, +/-, PIMS, PPP, SHP, BLKs</p>" +
            "</div>" +
        "<div class=\"delete-card\"><button class=\"button-del\" name=\"delete-button\" type=\"button\" onclick=\"return this.parentNode.parentNode.remove();\">X</button></div>" +
    "</div>"
}

function newWatchlistCard(playerName) {
    let x = document.getElementById("player-search").value;
    document.getElementById("custom-section").innerHTML += 
    "<div class=\"player-card\">" + 
        "<div class=\"player-score\">" +
            "<h3 class=\"big-score\">0pts</h3>" +
        "</div>" +
        "<div class=\"player-details\">" +
            "<h4 class=\"player-name\">"+ x + "</h4>" +
            "<p class=\"player-stats\">G, A, +/-, PIMS, PPP, SHP, BLKs</p>" +
            "</div>" +
            "<div class=\"delete-card\"><button class=\"button-del\" name=\"delete-button\" type=\"button\" onclick=\"return this.parentNode.parentNode.remove();\">X</button></div>" +
    "</div>"
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const url = 'https://api-web.nhle.com/v1/schedule/now';

// async function getGameData() {
//     const response = await fetch(url);
//     const data = await response.json();
//     let x = parseInt(data.gameWeek[0].numberOfGames);
//     return x;
// }

function createGameBoxList() {
    let games = getRandomInteger(1, 16);
    for (let x = 0; x < games; x++) {
        document.getElementById("game-listings").innerHTML += 
        "<div class=\"game-box\">" + 
            "<h3>Team 1</h3>" + 
            "<h3>Team 2</h3>" +
        "</div>";        
    }
}

