const urlLineScores = 'https://api-web.nhle.com/v1/score/now';
const urlNumOfGames = 'https://api-web.nhle.com/v1/schedule/now';

async function getGameScores() {
    const responseNumGames = await fetch(urlNumOfGames);
    const dataNumGames = await responseNumGames.json();
    let numberOfGames = parseInt(dataNumGames.gameWeek[0].numberOfGames.valueOf());
    
    const responseGameScores = await fetch(urlLineScores);
    const dataGameScores = await responseGameScores.json();

    let homeTeam = '';
    let homeScore = 0;
    let homeLogo = '';
    let awayTeam = '';
    let awayScore = 0;
    let awayLogo = '';

    for (let x = 0; x < numberOfGames; x++) {
        homeTeam = dataGameScores.games[x].homeTeam.abbrev;
        homeScore = dataGameScores.games[x].homeTeam.score;
        homeLogo = dataGameScores.games[x].homeTeam.logo;
        awayTeam = dataGameScores.games[x].awayTeam.abbrev;
        awayScore = dataGameScores.games[x].awayTeam.score;
        awayLogo = dataGameScores.games[x].awayTeam.logo;
        if (typeof homeScore === "undefined") {
            homeScore = 0;
            awayScore = 0;
        }

        document.getElementById("game-listings").innerHTML += `
        <div class="game-box">
            <div class="home-row">
                <img src="${homeLogo}" alt="" class="home-team-logo">
                <span class="home-team-abbrev">${homeTeam}</span>
                <span class="home-team-score">${homeScore}</span>
            </div>
            <div class="away-row">
                <img src="${awayLogo}" alt="" class="away-team-logo">
                <span class="away-team-abbrev">${awayTeam}</span>
                <span class="away-team-score">${awayScore}</span>
            </div>
        </div>
        `
    }
    
}

