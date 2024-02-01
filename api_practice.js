const url = 'https://api-web.nhle.com/v1/player/8478402/game-log/now';

async function testFunction() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

testFunction();