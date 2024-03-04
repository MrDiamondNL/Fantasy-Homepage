
const url = 'https://api-web.nhle.com/v1/schedule/now';
// const numOfGames = getGameData();
// window.onload = createGameBoxList();
// let games = getGameData();

function loadHomePage() {
    location.href = './index.html';
}

function loadNewsPage() {
    location.href = './news.html';
}

function loadStandingsPage() {
    location.href = './standings.html';
}

function loadFantasyPage() {
    location.href = './fantasy_team.html';
}

function loadShopPage() {
    location.href = './shop.html';
}

function loadGitHubPage() {
    window.open('https://github.com/MrDiamondNL');
}

function loadFacebookPage() {
    window.open('https://www.facebook.com/sam.diamond.507');
}

function loadLinkedInPage(){
    window.open('https://www.linkedin.com/in/sam-diamond-8644382a7/')
}

// function newRosterCard() {
//     let x = document.getElementById("player-search").value;
//     document.getElementById("roster-section").innerHTML += 
//     "<div class=\"player-card\">" + 
//         "<div class=\"player-score\">" +
//             "<h3 class=\"big-score\">0pts</h3>" +
//         "</div>" +
//         "<div class=\"player-details\">" +
//             "<h4 class=\"player-name\">"+ x + "</h4>" +
//             "<p class=\"player-stats\">G, A, +/-, PIMS, PPP, SHP, BLKs</p>" +
//             "</div>" +
//         "<div class=\"delete-card\"><button class=\"button-del\" name=\"delete-button\" type=\"button\" onclick=\"return this.parentNode.parentNode.remove();\">X</button></div>" +
//     "</div>"
// }

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



