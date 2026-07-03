let games = [];

async function loadGames() {
    const response = await fetch(
        "https://www.freetogame.com/api/games"
    );

    const data = await response.json();

    games = data.map(game => ({
        id: game.id,
        title: game.title,
        price: Math.floor(Math.random() * 50) + 20,
        category: game.genre,
        image: game.thumbnail,
        description: game.short_description
    }));

    showGames(games);
    fetch("https://www.freetogame.com/api/games")
  .then(res => res.json())
  .then(data => console.log(data));
}

loadGames();

// 1. Initialisation (LocalStorage)
let card = JSON.parse(localStorage.getItem('game-cart')) || [];
let discountPercentage = 0; 

// Les éléments HTML
const grid = document.getElementById('game-grid');
const search = document.getElementById('search_input');
const listCard = document.getElementById('listCard');
const btnStartCard = document.getElementById('startCard');
const btnCloseListCard = document.getElementById("closeCart");
const listCardItem = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const filterbtn = document.querySelectorAll('.filter-btn');
const overlay = document.getElementById('cart-overlay');

// Bloc de Coupon dynamique
const couponWrapper = document.createElement('div');
couponWrapper.className = "mb-4 p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-2";
couponWrapper.innerHTML = `
    <label class="text-xs font-bold text-slate-400 block uppercase tracking-wider">Code Promo (Ex: GAMER30)</label>
    <div class="flex gap-2">
        <input id="search_cup" type="text" placeholder="Entrez le code..." class="bg-slate-950 text-white p-2 rounded-lg text-sm w-full outline-none border border-slate-600 focus:border-indigo-500 flex-1">
        <button id="btn_apply_cup" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 rounded-lg transition-colors">Appliquer</button>
    </div>
    <p id="reduction" class="text-xs font-semibold text-emerald-400 hidden"></p>
`;

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

// --- Fonction Notification Toast ---
function showNotification(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = "bg-slate-900/90 backdrop-blur-md text-white border border-indigo-500/50 px-5 py-3 rounded-xl shadow-xl shadow-indigo-500/10 flex items-center gap-3 transform translate-x-full opacity-0 transition-all duration-300 pointer-events-auto text-sm font-semibold";
    
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check text-emerald-400 text-base"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 50);

    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Fonction d'affichage des jeux ---
function showGames(list) {
    grid.innerHTML = ""; 
    list.forEach(game => {
        grid.innerHTML += `
            <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300">
                <div>
                    <div class="relative overflow-hidden rounded-xl h-40">
                        <img src="${game.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm text-indigo-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-slate-800">
                            ${game.category}
                        </span>
                    </div>
                    <h3 class="mt-3 font-bold text-base text-white tracking-wide line-clamp-1">${game.title}</h3>
                    <p class="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">${game.description || 'Profitez d\'une expérience de jeu immersive.'}</p>
                </div>
                <div class="mt-4">
                    <div class="flex items-center justify-between">
                        <span class="text-indigo-400 font-black text-lg">${game.price.toFixed(2)} $</span>
                    </div>
                    <button onclick="addToCart(${game.id})" class="bg-indigo-600 w-full mt-2 py-2 rounded-xl hover:bg-indigo-700 text-white font-bold text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `;
    });
}

// --- Fonction pour Afficher le contenu du Panier ---
function renderCart() {
    listCardItem.innerHTML = "";
    listCardItem.appendChild(couponWrapper);
    
    const inputCup = document.getElementById('search_cup');
    if(inputCup) {
        inputCup.value = discountPercentage > 0 ? "GAMER30" : "";
    }

    let total = 0;

    card.forEach((item) => {
        total += item.game.price * item.qty;
        
        const itemRow = document.createElement('div');
        itemRow.className = "flex justify-between items-center bg-slate-800/60 border border-slate-800 p-3 rounded-xl mb-2 gap-2";
        itemRow.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${item.game.image}" class="w-12 h-12 object-cover rounded-lg border border-slate-700">
                <div>
                    <h4 class="text-sm font-bold text-white line-clamp-1">${item.game.title}</h4>
                    <div class="flex items-center gap-2 mt-1.5">
                        <button onclick="changeQty(${item.game.id}, -1)" class="bg-slate-700 text-white px-2 py-0.5 rounded-md hover:bg-red-600 transition-colors text-xs font-bold">-</button>
                        <span class="text-xs font-medium text-slate-300">Qty: ${item.qty}</span>
                        <button onclick="changeQty(${item.game.id}, 1)" class="bg-slate-700 text-white px-2 py-0.5 rounded-md hover:bg-green-600 transition-colors text-xs font-bold">+</button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end gap-1">
                <p class="text-indigo-400 font-black text-sm whitespace-nowrap">${(item.game.price * item.qty).toFixed(2)} $</p>
                <button onclick="removeFromCart(${item.game.id})" class="text-slate-500 hover:text-red-400 transition-colors text-xs">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        listCardItem.appendChild(itemRow);
    });

    const reductionElement = document.getElementById('reduction');
    if (discountPercentage > 0) {
        let discountAmount = total * (discountPercentage / 100);
        let finalTotal = total - discountAmount;
        cartTotal.innerText = `${finalTotal.toFixed(2)} $`;
        
        if (reductionElement) {
            reductionElement.innerText = `🎁 Coupon appliqué: -${discountPercentage}% (-${discountAmount.toFixed(2)} $)`;
            reductionElement.classList.remove('hidden');
        }
    } else {
        cartTotal.innerText = `${total.toFixed(2)} $`;
        if (reductionElement) reductionElement.classList.add('hidden');
    }
}

// --- Logic de Coupon ---
function initCouponGlobal() {
    couponWrapper.querySelector('#btn_apply_cup').addEventListener('click', () => {
        const inputCup = couponWrapper.querySelector('#search_cup');
        const reductionElement = couponWrapper.querySelector('#reduction');
        let value = inputCup.value.trim().toUpperCase();

        if (value === "GAMER30") {
            discountPercentage = 30; 
            renderCart();
        } else if (value === "") {
            discountPercentage = 0;
            renderCart();
        } else {
            discountPercentage = 0;
            reductionElement.innerText = "❌ Code invalide.";
            reductionElement.className = "text-xs font-semibold text-red-400 block";
            cartTotal.innerText = `${card.reduce((t, i) => t + i.game.price * i.qty, 0).toFixed(2)} $`;
        }
    });
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

    localStorage.setItem('game-cart', JSON.stringify(card));
    showNotification(`⚡ ${game.title} a été ajouté au panier !`);
    renderCart(); 
}

// --- Changer quantité ---
window.changeQty = function(id, delta) {
    const item = card.find((t) => t.game.id === id);
    if (item) {
        item.qty = item.qty + delta;
        if (item.qty < 1) {
            card = card.filter((t) => t.game.id !== id);
        }
    }
    localStorage.setItem('game-cart', JSON.stringify(card));
    renderCart();
}

// --- Supprimer définitivement un jeu du panier ---
window.removeFromCart = function(id) {
    let game = games.find(g => g.id === id);
    card = card.filter((t) => t.game.id !== id);
    
    localStorage.setItem('game-cart', JSON.stringify(card));
    renderCart();
    showNotification(`🗑️ "${game.title}" a été retiré du panier.`);
}

// --- Recherche en temps réel ---
search.addEventListener('input', (e) => {
    let valeur = e.target.value.toLowerCase(); 
    let resulta = games.filter(game => game.title.toLowerCase().includes(valeur));
    showGames(resulta); 
});

// --- Filtres de Catégories ---
filterbtn.forEach(btn => {
    btn.addEventListener('click', () => {
        filterbtn.forEach(b => {
            b.className = "filter-btn px-5 py-2 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500";
        });
        btn.className = "filter-btn px-5 py-2 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-indigo-600 text-white border border-indigo-600 shadow-lg shadow-indigo-600/20";

        const selctuser = btn.getAttribute('data-genre');

        if (selctuser === "All") {
            showGames(games);
        } else {
            showGames(games.filter((g) => g.category === selctuser));
        }
    });
});

// --- Commande / Checkout ---
document.getElementById('BtnCommande').addEventListener("click", () => {
    if (card.length === 0) {
        showNotification("⚠️ Votre panier est vide !");
        return;
    }
    
    // Remplacement de l'alert natif par la notification Toast personnalisée
    showNotification("🚀 Commande validée avec succès ! Merci pour votre confiance.");
    
    // Réinitialisation de l'état du panier
    card = [];
    discountPercentage = 0;
    localStorage.setItem('game-cart', JSON.stringify([]));
    
    // Fermeture propre du volet coulissant et rafraîchissement
    closeCart();
    showGames(games);
    
    // Réinitialisation visuelle des filtres (Bouton 'Tout' actif)
    filterbtn.forEach((b, idx) => {
        if(idx === 0) {
            b.className = "filter-btn px-5 py-2 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-indigo-600 text-white border border-indigo-600 shadow-lg shadow-indigo-600/20";
        } else {
            b.className = "filter-btn px-5 py-2 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500";
        }
    });
});


// --- Lancer la page ---
initCouponGlobal();
// showGames(games);