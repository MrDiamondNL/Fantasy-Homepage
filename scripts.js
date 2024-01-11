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

function deleteCard(ele) {
    let x = document.getElement
}