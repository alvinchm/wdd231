import { getMenuData } from './menu-data.js';

const menuBtn = document.getElementById('menu-btn');
const navUL = document.getElementById('nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navUL.classList.toggle('open');
        menuBtn.textContent = navUL.classList.contains('open') ? 'X' : '☰';
    });
}
const navLinksArray = document.querySelectorAll('.nav-links a');
const currentURL = window.location.href;

navLinksArray.forEach(link => {
    if (link.href === currentURL) {
        link.classList.add('active');
    }
});

const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if(lastModEl) lastModEl.textContent = `Last Modification: ${document.lastModified}`;

const visitMessage = document.getElementById('visit-message');
if (visitMessage) {
    let lastVisit = window.localStorage.getItem('visitaPollo'); 
    let today = new Date().toLocaleDateString();

    if (lastVisit) {
        visitMessage.textContent = `Welcome back! Your last visit was on ${lastVisit}. Ready for some chicken?`;
    } else {
        visitMessage.textContent = `Welcome to EL POLLO! Enjoy our delicious food.`;
    }
    window.localStorage.setItem('visitaPollo', today);
}

const cards = document.querySelector('#menu-container');

const displayMenu = (items) => {
    if (!cards) return; 
    cards.innerHTML = ""; 

    items.forEach((item) => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let image = document.createElement('img');
        let desc = document.createElement('p');
        let price = document.createElement('p');
        let btn = document.createElement('button'); 

        card.className = 'menu-card';
        price.className = 'price';
        btn.className = 'btn';

        name.textContent = item.name;
        desc.textContent = item.description;
        price.textContent = `Bs. ${item.price}`;
        btn.textContent = "See Details";

        image.setAttribute('src', item.image);
        image.setAttribute('alt', `Image of ${item.name}`);
        image.setAttribute('loading', 'lazy');

        btn.addEventListener('click', () => {
            const modal = document.getElementById('item-modal');
            document.getElementById('modal-title').textContent = item.name;
            document.getElementById('modal-desc').textContent = item.description;
            modal.showModal();
        });

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(price);
        card.appendChild(btn);

        cards.appendChild(card);
    });
}

async function init() {
    if (cards) { 
        const menuItems = await getMenuData(); 
        displayMenu(menuItems);
    }
}

init();

const closeModalBtn = document.getElementById('close-modal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        document.getElementById('item-modal').close();
    });
}
async function displayDailySpecial() {
    const specialContainer = document.getElementById('daily-special');
    if (!specialContainer) return;

    const menuItems = await getMenuData();
    if (menuItems.length === 0) return;

    const day = new Date().getDay();
    const dailyItemIds = [3, 6, 7, 1, 8, 5, 2];
    const specialItemId = dailyItemIds[day];

    const specialItem = menuItems.find(item => item.id === specialItemId);

    if (specialItem) {
        const discountedPrice = (specialItem.price * 0.8).toFixed(2);

        specialContainer.innerHTML = `
            <div class="special-container">
                <img src="${specialItem.image}" alt="${specialItem.name}" class="special-img">
                <div class="special-text">
                    <h2 class="special-subtitle">Today's Special: 20% OFF!</h2>
                    <h3 class="special-name">${specialItem.name}</h3>
                    <p>${specialItem.description}</p>
                    <p class="special-old-price">Regular: Bs. ${specialItem.price}</p>
                    <p class="special-new-price">Today: Bs. ${discountedPrice}</p>
                    <a href="menu.html" class="btn btn-link">Order Now</a>
                </div>
            </div>
        `;
    }
}

displayDailySpecial();