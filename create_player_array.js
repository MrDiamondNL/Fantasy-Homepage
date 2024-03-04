const playerList = [];
const teamAbbrevList = [
    "TOR", "WSH", "BUF", "OTT", "TBL", "CAR", "MTL", "NJD", "DAL", "PIT", "SJS", "FLA", "COL", "NYI", "DET", "SEA", "CBJ", "ANA", "BOS", "CHI", "WPG", "STL", "EDM", "MIN", "VAN", "NSH", "CGY", "NYR", "ARI", "LAK", "VGK", "PHI"];

let currentTeamFetch = "";
let currentPlayerFetch = "";
let urlTeamRosterFetch = `https://api-web.nhle.com/v1/roster/${currentTeamFetch}/current`;
let playerFirstName = "";
let playerLastName = "";
let playerPosition = "";
let playerCode = 0;
let playerStatList = [];

// const searchInput = document.querySelector(".player-search");
// const input = searchInput.querySelector("input");
// const resultBox = searchInput.querySelector(".result-box");

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

addPlayerToArray();

// input.onkeyup = (e) => {
//     let userSearch = e.target.value;
//     let emptyArray = [];
//     if (userSearch) {
//         emptyArray = playerList.filter((data) => {
//             return data.toLocaleLowerCase().startsWith(userSearch.toLocaleLowerCase());
//         });
//         emptyArray = emptyArray.map((data) => {
//             return data = '<li>' + data + '</li>';
//         });
//         searchInput.classList.add("active");
//         showSuggestions(emptyArray);
//         let allList = resultBox.querySelectorAll("li");
//         for (let x = 0; x < allList.length; x++) {
//             allList[x].setAttribute("onclick", "select(this)");
//         }
//     } else {
//         searchInput.classList.remove("active");
//     }
// }

// function showSuggestions(list) {
//     let listData;
//     if(!list.length) {
//         userValue = inputBox.value;
//         listData = '<li>' + userValue + '</li>';
//     } else {
//         listData = list.join('');
//     }
//     resultBox.innerHTML = listData;
// }

function pullPlayerCode() {
    let fullName = "";
    let userSearch = document.getElementById("player-search").value;
    for (let x = 0; x < playerList.length; x++) {
        fullName = (playerList[x].firstName).concat(" ", playerList[x].lastName);
        if (userSearch.toLowerCase() == fullName.toLowerCase()) {
            return playerList[x].playerID;
        }
    }
}

async function pullPlayerStats() {
    let data = pullPlayerCode();
    currentPlayerFetch = data.toString();
    let urlPlayerStatFetch = `https://api-web.nhle.com/v1/player/${currentPlayerFetch}/landing`;
    let currentData = await getData(urlPlayerStatFetch);
    playerStatList = currentData.featuredStats.regularSeason.subSeason;
    console.log(playerStatList);
    return playerStatList;
}

function newRosterCard() {
    playerStatList = pullPlayerStats();
    let x = document.getElementById("player-search").value;
    document.getElementById("roster-section").innerHTML += `
    <div class = "player-card">
        <div class="player-score">
            <h3 class="big-score">0pts</h3>
        </div> 
        <div class="player-details">
            <h4 class="player-name"> </h4> 
            <p class="player-stats">G, A, +/-, PIMS, PPP, SHP, BLKs</p>
            </div>
        "<div class= "delete-card"><button class = "button-del" name ="delete-button" type ="button" onclick = "return this.parentNode.parentNode.remove();">X</button></div>
    </div>
    `;
}