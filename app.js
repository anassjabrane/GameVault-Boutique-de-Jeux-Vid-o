import { games } from "./data.js";

// 1. Initialisation (  LocalStorage)
let card = JSON.parse(localStorage.getItem('game-cart')) || [];

// Les éléments HTML
const grid = document.getElementById('game-grid');
const search = document.getElementById('search_input');
const listCard = document.getElementById('listCard');
const btnStartCard = document.getElementById('startCard');
const btnCloseListCard = document.getElementById("closeCart");
const listCardItem = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

const filterbtn=  document.querySelectorAll('.filter-btn');



const overlay = document.getElementById('cart-overlay'); 

const inputcup = document.getElementById('search_cup')

// --- Fonctions Ouverture / Fermeture ---
const showListCard = () => {
    listCard.classList.remove('translate-x-full');
    if(overlay) overlay.classList.remove('hidden');
    renderCart(); 
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


inputcup.addEventListener('input',(e)=>{
    let value  =  e.target.value.toLowerCase(); 
    let resu =  games.find(game => game.title.toLowerCase().includes(valeur));

    if(resu === GAMER30){
        

    }

})


// --- Fonction pour Afficher le contenu du Panier (Sidebar) ---
function renderCart() {
    listCardItem.innerHTML = "";
    let total = 0;

 card.forEach((item) => {
    total += item.game.price * item.qty;
    listCardItem.innerHTML += `
        <div class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2">
            <div class="flex items-center gap-3">
                <img src="${item.game.image}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="text-sm font-bold">${item.game.title}</h4>
                    
                    <div class="flex items-center gap-2 mt-1">
                        <button onclick="changeQty(${item.game.id}, -1)" class="bg-gray-700 px-2 rounded hover:bg-red-600">-</button>
                        <span class="text-xs text-white">Qty: ${item.qty}</span>
                        <button onclick="changeQty(${item.game.id}, 1)" class="bg-gray-700 px-2 rounded hover:bg-green-600">+</button>
                    </div>
                    <div>
                    <input id="search_cup" type="text" placeholder="Search for games..." 
                    <p id ="reduction "><p/>
                    <div/>
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

    //  Save to LocalStorage
    localStorage.setItem('game-cart', JSON.stringify(card));
    
    alert(game.title + " est ajoute! ");
    renderCart(); 
}


window.changeQty = function(id, delta) {
    const item = card.find((t) => t.game.id === id);
    if (item) {
         item.qty = item.qty +  delta;
        if (item.qty < 1) {
            card = card.filter((t) => t.game.id !== id);
        }
    }
    localStorage.setItem('game-cart', JSON.stringify(card));
    renderCart();
}

// Recherche
search.addEventListener('input', (e) => {
    let valeur = e.target.value.toLowerCase(); 
    let resulta = games.filter(game => game.title.toLowerCase().includes(valeur));
    showGames(resulta); 
});


filterbtn.forEach(btn =>{
    btn.addEventListener('click' , ()=>{
        const selctuser =btn.getAttribute('data-genre');

        if(selctuser === "All"){
            showGames(games);
        }else{
            showGames(games.filter((g) => g.category === selctuser));
        }

        
    })
})

document.getElementById('BtnCommande').addEventListener("click", () =>{
      localStorage.setItem('game-cart', JSON.stringify([]));
      location.reload();

})

showGames(games);


