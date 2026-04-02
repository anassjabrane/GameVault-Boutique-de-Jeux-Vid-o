
import { games } from "./data.js";
let card = [];

let loadCart = JSON.parse(localStorage.getItem('game-cart')) || [];
const saveCard = () => localStorage.setItem('game-cart', JSON.stringify(card));

const grid = document.getElementById('game-grid');
const search = document.getElementById('search_input');

const listCard = document.getElementById('listCard');
const btnStartCard = document.getElementById('startCard');
const btnCloseListCard = document.getElementById("closeCart");
const listCardItem = document.getElementById('cart-items-list');

listCardItem.innerHTML = 'dfgdfgdfgdfg'

const showListCard = () => {
   listCard.classList.remove('translate-x-full');  
    overlay.classList.remove('hidden');

}

const  closeCart = () => {
    listCard.classList.add('translate-x-full');
    overlay.classList.add('hidden');
}

btnStartCard.addEventListener('click', showListCard);
btnCloseListCard.addEventListener('click', closeCart);

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
                <button onclick="addToCart(${game.id})" class="bg-blue-600 w-full mt-2 py-1 rounded hover:bg-blue-700 text-white font-semibold">
   Add
</button>
            </div>
        `;
    });
}
//  Recherche Dynamique







search.addEventListener('input', (e) => {
    let valeur = e.target.value.toLowerCase(); 

    
    let resulta = games.filter(game => {
        return game.title.toLowerCase().includes(valeur);
    });

    showGames(resulta); 
});


window.addToCart = function(id) {
   
    let game = games.find(g => g.id === id);

    const item = card.find((t) =>t.game.id === id);

    item ? item.qty++ : card.push({game, qty:1});

   



        alert(game.title + " est ajoute au panier ");
        
    }

    console.log(card)










showGames(games);





