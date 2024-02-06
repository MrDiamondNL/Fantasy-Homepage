const standingsUrl = 'https://api-web.nhle.com/v1/standings/now';
const standingsArray = [];
const atlanticArray = [];
const metroArray = [];
const centralArray = [];
const pacificArray = [];
const easternArray = [];
const westernArray = [];
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
    await createStandingsArray();
    for (let x = 0; x < standingsArray.length; x++) {
        document.getElementById("conference-table").innerHTML += `
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
createLeagueTable();


