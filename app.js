import { games } from "./data.js";

// 1. Initialisation (Kan-jbdou l-qdim mn LocalStorage)
let card = JSON.parse(localStorage.getItem('game-cart')) || [];

// Les éléments HTML
const grid = document.getElementById('game-grid');
const search = document.getElementById('search_input');
const listCard = document.getElementById('listCard');
const btnStartCard = document.getElementById('startCard');
const btnCloseListCard = document.getElementById("closeCart");
const listCardItem = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Zdna l-overlay b l-JS 7it ma-m'déclarich 3ndek
const overlay = document.getElementById('cart-overlay'); 

// --- Fonctions dial l-Ouverture / Fermeture ---
const showListCard = () => {
    listCard.classList.remove('translate-x-full');
    if(overlay) overlay.classList.remove('hidden');
    renderCart(); // Fach n-7ellou l-panier, n-affichiw ach fih
}

const closeCart = () => {
    listCard.classList.add('translate-x-full');
    if(overlay) overlay.classList.add('hidden');
}

btnStartCard.addEventListener('click', showListCard);
btnCloseListCard.addEventListener('click', closeCart);
if(overlay) overlay.addEventListener('click', closeCart);

// --- Fonction d'affichage des jeux ---
function showGames(list) {
    grid.innerHTML = ""; 
    list.forEach(game => {
        grid.innerHTML += `
            <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
                <img src="${game.image}" class="w-full h-40 object-cover rounded">
                <h3 class="mt-2 font-bold">${game.title}</h3>
                <p class="text-green-500 font-bold">${game.price} $</p>
                <button onclick="addToCart(${game.id})" class="bg-blue-600 w-full mt-2 py-1 rounded hover:bg-blue-700 text-white font-semibold">
                    Add
                </button>
            </div>
        `;
    });
}

// --- Fonction pour Afficher le contenu du Panier (Sidebar) ---
function renderCart() {
    listCardItem.innerHTML = "";
    let total = 0;

    card.forEach((item, index) => {
        total += item.game.price * item.qty;
        listCardItem.innerHTML += `
            <div class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2">
                <div class="flex items-center gap-3">
                    <img src="${item.game.image}" class="w-12 h-12 object-cover rounded">
                    <div>
                        <h4 class="text-sm font-bold">${item.game.title}</h4>
                        <p class="text-xs text-gray-400">Qty: ${item.qty}</p>
                    </div>
                </div>
                <p class="text-green-500 font-bold">${item.game.price * item.qty} $</p>
            </div>
        `;
    });
    cartTotal.innerText = `${total} $`;
}

// --- Fonction d'ajout au panier ---
window.addToCart = function(id) {
    let game = games.find(g => g.id === id);
    const item = card.find((t) => t.game.id === id);

    if (item) {
        item.qty++;
    } else {
        card.push({ game, qty: 1 });
    }

    // 💾 Save to LocalStorage
    localStorage.setItem('game-cart', JSON.stringify(card));
    
    alert(game.title + " t-zad f l-panier! ✅");
    renderCart(); // Update l-affichage f l-blassa
}

// Recherche
search.addEventListener('input', (e) => {
    let valeur = e.target.value.toLowerCase(); 
    let resulta = games.filter(game => game.title.toLowerCase().includes(valeur));
    showGames(resulta); 
});

showGames(games);