
const url = 'https://api-web.nhle.com/v1/schedule/now';
const numOfGames = getGameData();
window.onload = createGameBoxList();

function loadHomePage() {
    location.href = './index.html';
}

function loadNewsPage() {
    location.href = './news.html';
}

function loadPlayersPage() {
    location.href = './players.html';
}

function loadFantasyPage() {
    location.href = './fantasy_team.html';
}

function loadShopPage() {
    location.href = './shop.html';
}

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



async function getGameData() {
    const response = await fetch(url);
    const data = await response.json();
    let x = data.gameWeek[0].numberOfGames.valueOf();
    const y = JSON.parse(x);
    const z = parseInt(y);
    console.log(z);
    console.log(typeof x);
    return z;
}

function createGameBoxList() {
    // let games = getGameData();
    console.log(numOfGames);
    console.log(typeof numOfGames);
    for (let x = 0; x < Number(numOfGames); x++) {
        document.getElementById("game-listings").innerHTML += 
        "<div class=\"game-box\">" + 
            "<h3>Team 1</h3>" + 
            "<h3>Team 2</h3>" +
        "</div>";
        console.log('true');        
    }    
}

