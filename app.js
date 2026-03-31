
import { games } from "./data.js";

const grid = document.getElementById('game-grid');
const search = document.getElementById('search-input');

// Debugging
console.log('Games imported:', games);
console.log('Grid element:', grid);

// afichage::::::::::
function showGames() {
    if (!grid) {
        console.error('Game grid element not found');
        return;
    }
    grid.innerHTML = games.map(game => `
        <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <img src="${game.image}" class="w-full h-40 object-cover rounded">
            <h3 class="mt-2 font-bold">${game.title}</h3>
            <p class="text-green-500">${game.price} $</p>
            <button onclick="addToCart(${game.id})" class="bg-blue-600 w-full mt-2 py-1 rounded">Add</button>
        </div>
    `).join('');
}

// Call the function to render games
showGames();
