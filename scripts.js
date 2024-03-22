
const url = 'https://api-web.nhle.com/v1/schedule/now';

//Loads the HomePage
function loadHomePage() {
    location.href = './index.html';
}
//Loads the Standings Page
function loadStandingsPage() {
    location.href = './standings.html';
}
//Loads the Fantasy Page
function loadFantasyPage() {
    location.href = './fantasy_team.html';
}
//Loads the Shop Page
function loadShopPage() {
    location.href = './shop.html';
}
//Links to my GitHub
function loadGitHubPage() {
    window.open('https://github.com/MrDiamondNL');
}
//Links to my Facebook
function loadFacebookPage() {
    window.open('https://www.facebook.com/sam.diamond.507');
}
//Links to my LinkedIN
function loadLinkedInPage(){
    window.open('https://www.linkedin.com/in/sam-diamond-8644382a7/')
}

function toggleMobileMenu() {
    document.querySelector(".navigation-links").classList.toggle("expanded");
}



