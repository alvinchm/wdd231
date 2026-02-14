import { places } from '../data/places.mjs';

const menuBtn = document.getElementById('menu-btn');
const navUL = document.getElementById('primary-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navUL.classList.toggle('open');
        menuBtn.textContent = navUL.classList.contains('open') ? 'X' : '☰';
    });
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const container = document.getElementById('places-container');

function displayPlaces(items) {
    items.forEach((place, index) => {
        const card = document.createElement('div');
        card.classList.add('place-card');
        card.classList.add(`area${index + 1}`);

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" alt="${place.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button onclick="window.open('${place.learnMore}', '_blank')">Learn More</button>
        `;
        container.appendChild(card);
    });
}

displayPlaces(places);

const messageDiv = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    messageDiv.style.display = 'block';
} else {
    const diffTime = now - parseInt(lastVisit);
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(diffTime / oneDay);

    if (diffTime < oneDay) {
        messageDiv.textContent = "Back so soon! Awesome!";
        messageDiv.style.display = 'block';
    } else {
        const dayString = days === 1 ? "day" : "days";
        messageDiv.textContent = `You last visited ${days} ${dayString} ago.`;
        messageDiv.style.display = 'block';
    }
}

localStorage.setItem('lastVisit', now);