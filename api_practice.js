const url = 'https://api-web.nhle.com/v1/schedule/now';

async function getGameData() {
    const response = await fetch(url);
    const data = await response.json();
    let x = parseInt(data.gameWeek[0].numberOfGames);
    console.log(x);
    return x;
    
}

function createGameBoxList() {
    let games = getGameData();
    console.log(games);
    for (let x = 0; x < games; x++) {
        document.getElementById("game-listings").innerHTML += 
        "<div class=\"game-box\">" + 
            "<h3>Team 1</h3>" + 
            "<h3>Team 2</h3>" +
        "</div>";        
    }
}

createGameBoxList();