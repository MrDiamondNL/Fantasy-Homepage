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
let playerPortrait = "";
let tempPortrait = "";

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
            playerPortrait = currentRoster.forwards[y].headshot;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode, playerPortrait);
        }
        for (let y = 0; y <currentRoster.defensemen.length; y++) {
            playerFirstName = currentRoster.defensemen[y].firstName.default;
            playerLastName = currentRoster.defensemen[y].lastName.default;
            playerPosition = currentRoster.defensemen[y].positionCode;
            playerCode = currentRoster.defensemen[y].id;
            playerPortrait = currentRoster.defensemen[y].headshot;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode, playerPortrait);
        }
        for (let y = 0; y <currentRoster.goalies.length; y++) {
            playerFirstName = currentRoster.goalies[y].firstName.default;
            playerLastName = currentRoster.goalies[y].lastName.default;
            playerPosition = currentRoster.goalies[y].positionCode;
            playerCode = currentRoster.goalies[y].id;
            playerPortrait = currentRoster.goalies[y].headshot;
            appendToPlayerArray(playerFirstName, playerLastName, playerPosition, playerCode, playerPortrait);
        }
    }
}

function appendToPlayerArray(firstName, lastName, playerPos, playerID, portrait) {
    const newPlayer = {firstName, lastName, playerPos, playerID, portrait};
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
            tempPortrait = playerList[x].portrait;
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
    return playerStatList;
}

async function newRosterCard() {
    playerStatList = await pullPlayerStats();    
    let x = document.getElementById("player-search").value;
    document.getElementById("roster-section").innerHTML += `
    <div class = "player-card">
        <div class="player-score">
            <img src="${tempPortrait}" class="player-portrait" />
        </div> 
        <div class="player-details">
            <h4 class="player-name">${x} </h4> 
            <p class="player-stats">${playerStatList.goals} G, ${playerStatList.assists} A, ${playerStatList.plusMinus}, ${playerStatList.pim} PIMS, ${playerStatList.powerPlayPoints} PPP, ${playerStatList.shorthandedPoints} SHP</p>
            </div>
        <div class= "delete-card"><div class = "button-del" name ="delete-button" onclick = "return this.parentNode.parentNode.remove();"><i class="fa-solid fa-xmark"></i></div></div>
    </div>
    `;
    savePage();
}

async function newWatchlistCard(playerName) {
    playerStatList = await pullPlayerStats();    
    let x = document.getElementById("player-search").value;
    document.getElementById("custom-section").innerHTML += `
    <div class = "player-card">
        <div class="player-score">
            <img src="${tempPortrait}" class="player-portrait" />
        </div> 
        <div class="player-details">
            <h4 class="player-name">${x} </h4> 
            <p class="player-stats">${playerStatList.goals} G, ${playerStatList.assists} A, ${playerStatList.plusMinus}, ${playerStatList.pim} PIMS, ${playerStatList.powerPlayPoints} PPP, ${playerStatList.shorthandedPoints} SHP</p>
            </div>
        <div class= "delete-card"><div class = "button-del" name ="delete-button" onclick = "return this.parentNode.parentNode.remove();"><i class="fa-solid fa-xmark"></i></div></div>
    </div>
    `;
    savePage();
}

function savePage() {
    let content = document.getElementById("player-section").innerHTML;
    localStorage.setItem("customPlayerList", content);
    console.log(localStorage.getItem("customPlayerList"));
}

function loadPage() {
    let content = localStorage.getItem("customPlayerList");
    console.log(content);
    if (content) {
        document.getElementById("player-section").innerHTML = content;
    }
}