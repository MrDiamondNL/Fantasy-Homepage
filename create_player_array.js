const playerList = [];
const teamAbbrevList = [
    "TOR", "WSH", "BUF", "OTT", "TBL", "CAR", "MTL", "NJD", "DAL", "PIT", "SJS", "FLA", "COL", "NYI", "DET", "SEA", "CBJ", "ANA", "BOS", "CHI", "WPG", "STL", "EDM", "MIN", "VAN", "NSH", "CGY", "NYR", "ARI", "LAK", "VGK", "PHI"];

let currentTeamFetch = "";
let currentPlayerFetch = "";
let urlTeamRosterFetch = `https://api-web.nhle.com/v1/roster/${currentTeamFetch}/current`;
let urlPlayerStatFetch = `https://api-web.nhle.com/v1/player/${currentPlayerFetch}/landing`;
let playerFirstName = "";
let playerLastName = "";
let playerPosition = "";
let playerCode = 0;


async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
}

async function addPlayerToArray() {
    // currentPlayerFetch = idCode.toString();
    // urlPlayerStatFetch = `https://api-web.nhle.com/v1/player/${currentPlayerFetch}/landing`;
    // let currentData = await getData(urlPlayerStatFetch);
    // console.log(currentData);
    for (let x = 0; x < teamAbbrevList.length; x++) {
        currentTeamFetch = teamAbbrevList[x];
        urlTeamRosterFetch = `https://api-web.nhle.com/v1/roster/${currentTeamFetch}/current`;
        let currentRoster = await getData(urlTeamRosterFetch);
        for (let y = 0; y < currentRoster.forwards.length; y++) {
            playerFirstName = currentRoster.forwards[y].firstName.default;
            playerLastName = currentRoster.forwards[y].lastName.default;
            playerPosition = currentRoster.forwards[y].positionCode;
            playerCode = currentRoster.forwards[y].id;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode);
        }
        for (let y = 0; y <currentRoster.defensemen.length; y++) {
            playerFirstName = currentRoster.defensemen[y].firstName.default;
            playerLastName = currentRoster.defensemen[y].lastName.default;
            playerPosition = currentRoster.defensemen[y].positionCode;
            playerCode = currentRoster.defensemen[y].id;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode);
        }
        for (let y = 0; y <currentRoster.goalies.length; y++) {
            playerFirstName = currentRoster.goalies[y].firstName.default;
            playerLastName = currentRoster.goalies[y].lastName.default;
            playerPosition = currentRoster.goalies[y].positionCode;
            playerCode = currentRoster.goalies[y].id;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode);
        }
    }
    console.log(playerList);
}

function appendToPlayerArray(firstName, lastName, playerPos, playerID) {
    const newPlayer = {firstName, lastName, playerPos, playerID};
    playerList.push(newPlayer);
}

// async function testFunction(url) {
//     currentRoster = await getData(url);
//     for (let y = 0; y < currentRoster.forwards.length; y++) {
//         playerFirstName = currentRoster.forwards[y].firstName.default;
//         playerLastName = currentRoster.forwards[y].lastName.default;
//         playerPosition = currentRoster.forwards[y].positionCode;
//         playerCode = currentRoster.forwards[y].id;
//         appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode);
//         playerList.push(playerFirstName, playerLastName, playerPosition, playerCode)
//     }
//     console.log(playerList);
// }

addPlayerToArray();

