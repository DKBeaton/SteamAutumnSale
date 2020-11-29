// on hover or mouse enter
// add tooltip like steams
// need lookup function into games.json

const games = [];
const gridContainer = document.querySelector('.grid-container');
const MAX_GAMES = 15;

const fetchGames = fetch('./json/games.json')
.then(response => response.json())
.then(data => games.push(...data));

// On page load, load in games data
window.onload = async () => {
  // Wait for fetch to complete
  await fetchGames;

  // Randomize game
  let arr = [];
  while (arr.length < 14) {
    let random = getRandomInt(MAX_GAMES);
    let i = arr.length;

    if (arr.indexOf(random) === -1) {
      arr.push(random);

      // Calculate grid size
      let gridSize = i < 4 ? 'small' : i < 7 ? 'large' : i < 11 ? 'small' : 'large';

      // Add game into grid container
      addGridItem(games[random], gridSize);
    }
  }
}

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




