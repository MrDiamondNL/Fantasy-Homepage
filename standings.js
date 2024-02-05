const standingsUrl = 'https://api-web.nhle.com/v1/standings/now';
const standingsArray = [];
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

// async function testFunction() {
//     const response = await fetch(standingsUrl);
//     const data = await response.json();    

//     for (let x = 0; x < data.standings.length; x++) {
//         teamRank = x + 1;
//         teamName = data.standings[x].teamName.default;
//         teamGamesPlayed = data.standings[x].gamesPlayed;
//         teamWins = data.standings[x].regulationPlusOtWins;
//         teamLosses = data.standings[x].losses;
//         teamOt = data.standings[x].otLosses;
//         teamPoints = data.standings[x].points;
//         teamLogo = data.standings[x].teamLogo;
//         confAbbrev = data.standings[x].conferenceAbbrev;
//         divAbbrev = data.standings[x].divisionAbbrev;
//         teamObject = {teamRank, teamName, teamGamesPlayed, teamWins, teamLosses, teamOt, teamPoints, teamLogo, confAbbrev, divAbbrev}

//         standingsArray.push(teamObject);
//     }
// }

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


async function createConferenceTable() {
    await createStandingsArray();
    for (let x = 0; x < standingsArray.length; x++) {
        document.getElementById("conference-table").innerHTML += `
        <div class="team-listing-row">
            <span class="rank-col">${standingsArray[x].teamRank}</span>
            <span class="team-col">${standingsArray[x].teamName}</span>
            <span class="gp-col">${standingsArray[x].teamGamesPlayed}</span>
            <span class="wins-col">${standingsArray[x].teamWins}</span>
            <span class="loss-col">${standingsArray[x].teamLosses}</span>
            <span class="ot-col">${standingsArray[x].teamOt}</span>
            <span class="points-col">${standingsArray[x].teamPoints}</span>
        </div>
    `
    }
}

createConferenceTable();


