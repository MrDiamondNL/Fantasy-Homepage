const standingsUrl = 'https://api-web.nhle.com/v1/standings/now';
const standingsArray = [];
const atlanticArray = [];
const metroArray = [];
const centralArray = [];
const pacificArray = [];
const easternArray = [];
const westernArray = [];
const westernWildCard = [];
const easternWildCard = [];
let teamObject = {};
let teamRank = 0;
let teamName = "";
let teamGamesPlayed = 0;
let teamWins = 0;
let teamLosses = 0;
let teamOt = 0;
let teamPoints = 0;
let teamLogo = "";
let confAbbrev = "";
let divAbbrev = "";

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function createStandingsArray() {
    let standingsData = await getData(standingsUrl);
    for (let x = 0; x < standingsData.standings.length; x++) {
        teamRank = x + 1;
        teamName = standingsData.standings[x].teamName.default;
        teamGamesPlayed = standingsData.standings[x].gamesPlayed;
        teamWins = standingsData.standings[x].regulationPlusOtWins;
        teamLosses = standingsData.standings[x].losses;
        teamOt = standingsData.standings[x].otLosses;
        teamPoints = standingsData.standings[x].points;
        teamLogo = standingsData.standings[x].teamLogo;
        confAbbrev = standingsData.standings[x].conferenceAbbrev;
        divAbbrev = standingsData.standings[x].divisionAbbrev;
        teamObject = {teamRank, teamName, teamGamesPlayed, teamWins, teamLosses, teamOt, teamPoints, teamLogo, confAbbrev, divAbbrev};

        standingsArray.push(teamObject);
    }
    console.log(standingsData.standings[0]);
}


async function createLeagueTable() {
    if (standingsArray.length == 0) {
        await createStandingsArray();
    }    
    document.getElementsByClassName("list-header")[0].innerHTML = "League Standings";
    document.getElementById("standings-table").innerHTML = "";
    document.getElementsByClassName("extra-list-header")[0].innerHTML = "";
    for (let x = 0; x < standingsArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${standingsArray[x].teamRank}</span>
            <span class="team-col"><img class="standings-team-logo" src="${standingsArray[x].teamLogo}" />${standingsArray[x].teamName}</span>
            <span class="gp-col">${standingsArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${standingsArray[x].teamWins}</span>
            <span class="loss-col">${standingsArray[x].teamLosses}</span>
            <span class="ot-col">${standingsArray[x].teamOt}</span>
            <span class="points-col">${standingsArray[x].teamPoints}</span>
        </div>
    `
    }
}

function createConferenceArray() {
    for (let x = 0; x < standingsArray.length; x++) {
        if (standingsArray[x].confAbbrev == "W") {
            westernArray.push(standingsArray[x]);
        } else {
            easternArray.push(standingsArray[x]);
        }
    }
}

function createDivisionArray() {
    for (let x = 0; x < standingsArray.length; x++) {
        if (standingsArray[x].divAbbrev == "A") {
            atlanticArray.push(standingsArray[x]);
        } else 
        if (standingsArray[x].divAbbrev == "M") {
            metroArray.push(standingsArray[x]);
        } else
        if (standingsArray[x].divAbbrev == "P") {
            pacificArray.push(standingsArray[x]);
        } else {
            centralArray.push(standingsArray[x]);
        }        
    }
}

function createWildCardArray() {
    let eastAtlCheck = 0;
    let eastMetCheck = 0;
    let westCenCheck = 0;
    let westPacCheck = 0;
    if (westernArray.length == 0) {
        createConferenceArray();
    }
    if (atlanticArray.length == 0) {
        createDivisionArray();
    }
    for (let x = 0; x < westernArray.length; x++) {
        if (westCenCheck < 3 && westernArray[x].divAbbrev == "C") {
            westCenCheck++;
        } else 
        if (westPacCheck < 3 && westernArray[x].divAbbrev == "P") {
            westPacCheck++;
        } else {
            westernWildCard.push(westernArray[x]);
        }
    }

    for (let x = 0; x < easternArray.length; x++) {
        if (eastAtlCheck < 3 && easternArray[x].divAbbrev == "A") {
            eastAtlCheck++;
        } else
        if (eastMetCheck < 3 && easternArray[x].divAbbrev == "M") {
            eastMetCheck++;
        } else {
            easternWildCard.push(easternArray[x]);
        }
    }
}

function createConferenceTable() {
    if (westernArray.length == 0) {
        createConferenceArray();
    }
    document.getElementById("standings-table").innerHTML = "";
    document.getElementsByClassName("list-header")[0].innerHTML = "Conference Standings";
    document.getElementsByClassName("extra-list-header")[0].innerHTML = `
        <h2 class="conference-title">Western</h2>`;
    for (let x = 0; x < westernArray.length; x++) {        
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${westernArray[x].teamLogo}" />${westernArray[x].teamName}</span>
            <span class="gp-col">${westernArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${westernArray[x].teamWins}</span>
            <span class="loss-col">${westernArray[x].teamLosses}</span>
            <span class="ot-col">${westernArray[x].teamOt}</span>
            <span class="points-col">${westernArray[x].teamPoints}</span>
        </div>
        `;
    }

    document.getElementById("standings-table").innerHTML += `
        <div class="extra-list-header">
            <h2 class="conference-title">Eastern</h2>
        </div>
        <div class="cat-headings">
            <h3 class="rank-number rank-col">Rank</h3>
            <h3 class="team-name team-col">Team</h3>
            <h3 class="games-played gp-col">GP</h3>
            <h3 class="wins-rec wins-col">W</h3>
            <h3 class="loss-rec loss-col">L</h3>
            <h3 class="otloss ot-col">OT</h3>
            <h3 class="points-total points-col">Points</h3>
        </div>
        `;
    for (let x = 0; x < easternArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${easternArray[x].teamLogo}" />${easternArray[x].teamName}</span>
            <span class="gp-col">${easternArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${easternArray[x].teamWins}</span>
            <span class="loss-col">${easternArray[x].teamLosses}</span>
            <span class="ot-col">${easternArray[x].teamOt}</span>
            <span class="points-col">${easternArray[x].teamPoints}</span>
        </div>
        `;
    }
}

function createDivisionTable() {
    if (atlanticArray.length == 0) {
        createDivisionArray();
    }
    document.getElementById("standings-table").innerHTML = "";
    document.getElementsByClassName("list-header")[0].innerHTML = "Division Standings";
    createConferenceArray();
    document.getElementsByClassName("extra-list-header")[0].innerHTML = `
        <h2 class="conference-title">Atlantic</h2>`;
    for (let x = 0; x < atlanticArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${atlanticArray[x].teamLogo}" />${atlanticArray[x].teamName}</span>
            <span class="gp-col">${atlanticArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${atlanticArray[x].teamWins}</span>
            <span class="loss-col">${atlanticArray[x].teamLosses}</span>
            <span class="ot-col">${atlanticArray[x].teamOt}</span>
            <span class="points-col">${atlanticArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
        <div class="extra-list-header">
            <h2 class="conference-title">Metro</h2>
        </div>
        <div class="cat-headings">
            <h3 class="rank-number rank-col">Rank</h3>
            <h3 class="team-name team-col">Team</h3>
            <h3 class="games-played gp-col">GP</h3>
            <h3 class="wins-rec wins-col">W</h3>
            <h3 class="loss-rec loss-col">L</h3>
            <h3 class="otloss ot-col">OT</h3>
            <h3 class="points-total points-col">Points</h3>
        </div>
        `;
    for (let x = 0; x < metroArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${metroArray[x].teamLogo}" />${metroArray[x].teamName}</span>
            <span class="gp-col">${metroArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${metroArray[x].teamWins}</span>
            <span class="loss-col">${metroArray[x].teamLosses}</span>
            <span class="ot-col">${metroArray[x].teamOt}</span>
            <span class="points-col">${metroArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
        <div class="extra-list-header">
            <h2 class="conference-title">Central</h2>
        </div>
        <div class="cat-headings">
            <h3 class="rank-number rank-col">Rank</h3>
            <h3 class="team-name team-col">Team</h3>
            <h3 class="games-played gp-col">GP</h3>
            <h3 class="wins-rec wins-col">W</h3>
            <h3 class="loss-rec loss-col">L</h3>
            <h3 class="otloss ot-col">OT</h3>
            <h3 class="points-total points-col">Points</h3>
        </div>
        `;
    for (let x = 0; x < centralArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${centralArray[x].teamLogo}" />${centralArray[x].teamName}</span>
            <span class="gp-col">${centralArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${centralArray[x].teamWins}</span>
            <span class="loss-col">${centralArray[x].teamLosses}</span>
            <span class="ot-col">${centralArray[x].teamOt}</span>
            <span class="points-col">${centralArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
        <div class="extra-list-header">
            <h2 class="conference-title">Pacific</h2>
        </div>
        <div class="cat-headings">
            <h3 class="rank-number rank-col">Rank</h3>
            <h3 class="team-name team-col">Team</h3>
            <h3 class="games-played gp-col">GP</h3>
            <h3 class="wins-rec wins-col">W</h3>
            <h3 class="loss-rec loss-col">L</h3>
            <h3 class="otloss ot-col">OT</h3>
            <h3 class="points-total points-col">Points</h3>
        </div>
        `;
    for (let x = 0; x < pacificArray.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${pacificArray[x].teamLogo}" />${pacificArray[x].teamName}</span>
            <span class="gp-col">${pacificArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${pacificArray[x].teamWins}</span>
            <span class="loss-col">${pacificArray[x].teamLosses}</span>
            <span class="ot-col">${pacificArray[x].teamOt}</span>
            <span class="points-col">${pacificArray[x].teamPoints}</span>
        </div>
        `;
    }
}

function createWildCardTable() {
    if (easternWildCard.length == 0) {
        createWildCardArray();
    }
    
    document.getElementById("standings-table").innerHTML = "";
    document.getElementsByClassName("list-header")[0].innerHTML = "WildCard Standings";
    document.getElementsByClassName("extra-list-header")[0].innerHTML = `
        <h2 class="conference-title">Pacific</h2>`;

    for (let x = 0; x < 3; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${pacificArray[x].teamLogo}" />${pacificArray[x].teamName}</span>
            <span class="gp-col">${pacificArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${pacificArray[x].teamWins}</span>
            <span class="loss-col">${pacificArray[x].teamLosses}</span>
            <span class="ot-col">${pacificArray[x].teamOt}</span>
            <span class="points-col">${pacificArray[x].teamPoints}</span>
        </div>
        `;
    }

    document.getElementById("standings-table").innerHTML += `
        <div class="extra-list-header">
            <h2 class="conference-title">Central</h2>
        </div>
        <div class="cat-headings">
            <h3 class="rank-number rank-col">Rank</h3>
            <h3 class="team-name team-col">Team</h3>
            <h3 class="games-played gp-col">GP</h3>
            <h3 class="wins-rec wins-col">W</h3>
            <h3 class="loss-rec loss-col">L</h3>
            <h3 class="otloss ot-col">OT</h3>
            <h3 class="points-total points-col">Points</h3>
        </div>
        `;
    for (let x = 0; x < 3; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${centralArray[x].teamLogo}" />${centralArray[x].teamName}</span>
            <span class="gp-col">${centralArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${centralArray[x].teamWins}</span>
            <span class="loss-col">${centralArray[x].teamLosses}</span>
            <span class="ot-col">${centralArray[x].teamOt}</span>
            <span class="points-col">${centralArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
    <div class="extra-list-header">
        <h2 class="conference-title">Western WildCard</h2>
    </div>
    <div class="cat-headings">
        <h3 class="rank-number rank-col">Rank</h3>
        <h3 class="team-name team-col">Team</h3>
        <h3 class="games-played gp-col">GP</h3>
        <h3 class="wins-rec wins-col">W</h3>
        <h3 class="loss-rec loss-col">L</h3>
        <h3 class="otloss ot-col">OT</h3>
        <h3 class="points-total points-col">Points</h3>
    </div>
    `;

    for (let x = 0; westernWildCard.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${westernWildCard[x].teamLogo}" />${westernWildCard[x].teamName}</span>
            <span class="gp-col">${westernWildCard[x].teamGamesPlayed}</span>
            <span class="wins-col">${westernWildCard[x].teamWins}</span>
            <span class="loss-col">${westernWildCard[x].teamLosses}</span>
            <span class="ot-col">${westernWildCard[x].teamOt}</span>
            <span class="points-col">${westernWildCard[x].teamPoints}</span>
        </div>
        `;
    }

    document.getElementById("standings-table").innerHTML += `
    <div class="extra-list-header">
        <h2 class="conference-title">Atlantic</h2>
    </div>
    <div class="cat-headings">
        <h3 class="rank-number rank-col">Rank</h3>
        <h3 class="team-name team-col">Team</h3>
        <h3 class="games-played gp-col">GP</h3>
        <h3 class="wins-rec wins-col">W</h3>
        <h3 class="loss-rec loss-col">L</h3>
        <h3 class="otloss ot-col">OT</h3>
        <h3 class="points-total points-col">Points</h3>
    </div>
    `;
    for (let x = 0; x < 3; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${atlanticArray[x].teamLogo}" />${atlanticArray[x].teamName}</span>
            <span class="gp-col">${atlanticArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${atlanticArray[x].teamWins}</span>
            <span class="loss-col">${atlanticArray[x].teamLosses}</span>
            <span class="ot-col">${atlanticArray[x].teamOt}</span>
            <span class="points-col">${atlanticArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
    <div class="extra-list-header">
        <h2 class="conference-title">Metro</h2>
    </div>
    <div class="cat-headings">
        <h3 class="rank-number rank-col">Rank</h3>
        <h3 class="team-name team-col">Team</h3>
        <h3 class="games-played gp-col">GP</h3>
        <h3 class="wins-rec wins-col">W</h3>
        <h3 class="loss-rec loss-col">L</h3>
        <h3 class="otloss ot-col">OT</h3>
        <h3 class="points-total points-col">Points</h3>
    </div>
    `;
    for (let x = 0; x < 3; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${metroArray[x].teamLogo}" />${metroArray[x].teamName}</span>
            <span class="gp-col">${metroArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${metroArray[x].teamWins}</span>
            <span class="loss-col">${metroArray[x].teamLosses}</span>
            <span class="ot-col">${metroArray[x].teamOt}</span>
            <span class="points-col">${metroArray[x].teamPoints}</span>
        </div>
        `;
    }
    document.getElementById("standings-table").innerHTML += `
    <div class="extra-list-header">
        <h2 class="conference-title">Eastern WildCard</h2>
    </div>
    <div class="cat-headings">
        <h3 class="rank-number rank-col">Rank</h3>
        <h3 class="team-name team-col">Team</h3>
        <h3 class="games-played gp-col">GP</h3>
        <h3 class="wins-rec wins-col">W</h3>
        <h3 class="loss-rec loss-col">L</h3>
        <h3 class="otloss ot-col">OT</h3>
        <h3 class="points-total points-col">Points</h3>
    </div>
    `;
    for (let x = 0; easternWildCard.length; x++) {
        document.getElementById("standings-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${x + 1}</span>
            <span class="team-col"><img class="standings-team-logo" src="${easternWildCard[x].teamLogo}" />${easternWildCard[x].teamName}</span>
            <span class="gp-col">${easternWildCard[x].teamGamesPlayed}</span>
            <span class="wins-col">${easternWildCard[x].teamWins}</span>
            <span class="loss-col">${easternWildCard[x].teamLosses}</span>
            <span class="ot-col">${easternWildCard[x].teamOt}</span>
            <span class="points-col">${easternWildCard[x].teamPoints}</span>
        </div>
        `;
    }
}
// createLeagueTable();


