const menuBtn = document.getElementById('menu-btn');
const navUL = document.getElementById('primary-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navUL.classList.toggle('open');
        menuBtn.textContent = navUL.classList.contains('open') ? 'X' : '☰';
    });
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Última Modificación: ${document.lastModified}`;

const url = 'data/members.json';
const cards = document.querySelector('#members-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data); 
    } catch (error) {
        console.error('Error al cargar miembros:', error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = ""; 

    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let level = document.createElement('p');

        name.textContent = member.name;
        address.textContent = member.address;
        address.classList.add('address');
        phone.textContent = member.phone;
        
        website.textContent = "Visitar Sitio Web";
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `Logo de ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '100');
        logo.setAttribute('height', 'auto');

        let levelText = "";
        if(member.membershipLevel === 3) { levelText = "Membresía Gold"; card.classList.add('membership-gold'); }
        else if(member.membershipLevel === 2) { levelText = "Membresía Silver"; card.classList.add('membership-silver'); }
        else { levelText = "Membresía Member"; card.classList.add('membership-bronze'); }
        
        level.textContent = levelText;
        level.classList.add('level');

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(level);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

getMembers();

const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const display = document.querySelector("#members-container");

gridBtn.addEventListener("click", () => {
	display.classList.add("grid-view");
	display.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
	display.classList.add("list-view");
	display.classList.remove("grid-view");
});