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

  // Setup tooltip
  // Or mouseover
  newElement.addEventListener('mouseenter', gameToolTip(game, newElement));

  // Add element to parent
  gridContainer.appendChild(newElement);
}

function gameToolTip(game, elem) {
  // Create element
  const newElement = document.createElement('div');
  newElement.classList.add('game-tooltip');

  //Parse user tags
  game.usertags.forEach((tag, i) => game.usertags[i] = `<div class="user-tag">${tag}</div>`);

  // Parse systems
  game.system.forEach((tag, i) => game.system[i] = (game.system[i] === 'Windows') ? `<i class="fab fa-windows"></i>` : (game.system[i] === 'Mac') ? `<i class="fab fa-apple"></i>` : `<i class="fab fa-steam-square"></i>`);

  // Add inner HTML data
  newElement.innerHTML = `
  <div class="tooltip-title">${game.name}</div>
  <div class="tooltip-release-date">${game.release}</div>
  <div class="tooltip-description">${game.description}</div>
  <div class="tooltip-reviews">Overall user reviews:<br><span class="tooltip-review">${game.reviews}</span></div>
  <div class="tooltip-system">${game.system.join(' ')}</div>
  <div class="tooltip-tags-title">User tags:</div>
  <div class="tooltip-tags">${game.usertags.join('')}</div>`;

   // Add element to parent
   elem.appendChild(newElement);

   // Check if element will be off screen
  elem.addEventListener('mouseenter', function(e) {
    // Get inner element
    let child = e.target.querySelector('.game-tooltip');

    let rect = child.getBoundingClientRect();
    let w = document.documentElement.clientWidth;

    // Check if right edge is offscreen
    let rightEdgeInRange = rect.right >= 0 && rect.right <= w;

    // Change display position
    if (!rightEdgeInRange) {
      child.style.left = '-305px';
    }  
  });

  elem.addEventListener('mouseleave', function(e) {
    // Get inner element
    let child = e.target.querySelector('.game-tooltip');

    // Reset left position back to default
    child.style.left = '';
  });


}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


