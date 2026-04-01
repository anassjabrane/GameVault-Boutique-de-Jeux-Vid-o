
import { games } from "./data.js";

const grid = document.getElementById('game-grid');
const search = document.getElementById('search_input');

// Debugging
// console.log('Games imported:', games);
// console.log('Grid element:', grid);

// afichage::::::::::
function showGames(list) {
    grid.innerHTML = ""; 
    
    list.forEach(game => {
        grid.innerHTML += `
            <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
                <img src="${game.image}" class="w-full h-40 object-cover rounded">
                <h3 class="mt-2 font-bold">${game.title}</h3>
                <p class="text-green-500">${game.price} $</p>
                <button class="bg-blue-600 w-full mt-2 py-1 rounded">Add</button>
            </div>
        `;
    });
}
//  Recherche Dynamique






// Call the function to render games
showGames(games);


