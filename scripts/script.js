// on windows load
// Loop 14 times
// random function into games .json 

// on hover or mouse enter
// add tooltip like steams
// need lookup function into games.json

const games = [];
const gridContainer = document.querySelector('.grid-container');
const MAX_GAMES = 8;

// let fetchData = async (url) => {
//   let response = await fetch(url);
//   let result = await response.json();
//   console.log(result);
//   games.push(...result);
// }

// function fetchGames(url) {
//   const response = await fetch(url);
//   let result = await response.json();
//   games.push(...result);
//   return result;
// }

const fetchGames = fetch('./json/games.json')
.then(response => response.json())
.then(data => games.push(...data));

// fetch('./json/games.json')
// .then(response => response.json())
// .then(data => games.push(...data));

// On page load, load in games data
window.onload = async () => {

  // Wait for fetch to complete
  await fetchGames;

  for (let i = 0; i < 14; i++) {
    // Randomaize game
    //let random = getRandomInt(MAX_GAMES);

    // Calculate grid size
    let gridSize = i < 4 ? 'small' : i < 7 ? 'large' : i < 11 ? 'small' : 'large';

    // Add game into grid container
    addGridItem(games[i], gridSize);
  }


}

// window.addEventListener('load', function () {

//   fetchGames('./json/games.json')
//   .then (data => games.push(...data));
//   console.log(games);

//   for (let i = 0; i < 3; i++) {
//     // Randomaize game
//     let random = getRandomInt(MAX_GAMES);

//     // Calculate grid size
//     let gridSize = i < 4 ? 'small' : i < 7 ? 'large' : i < 11 ? 'small' : 'large';

//     //console.log(games[random]);
//     // Add game into grid container
//     addGridItem(games[random], gridSize);
//   }
// })

// Add dom grid item to grid container
function addGridItem(game, gridSize) {
  
  // Create element
  const newElement = document.createElement('div');
  newElement.classList.add('item', `${gridSize}`);

  // Add inner HTML data
  newElement.innerHTML = `
  <img src="${game.image}" alt="">
  <div class="price-description">
    <div class="price-percentage">${Math.ceil((game.saleprice - game.originalprice)/game.originalprice * 100)}%</div>
    <div class="old-price">CDN$ ${game.originalprice}</div>
    <div class="new-price">CDN$ ${game.saleprice}</div>
  </div>
  `;

  gridContainer.appendChild(newElement);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




