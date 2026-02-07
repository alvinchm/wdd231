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

const apiKey = 'f75594672434c8de6dac60e593a1d975'; 
const lat = '-16.50';
const lon = '-68.15';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const current = data.list[0];
    const iconSrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    
    document.getElementById('current-temp').innerHTML = `${Math.round(current.main.temp)}`;
    document.getElementById('weather-desc').innerHTML = current.weather[0].description;
    
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', current.weather[0].description);

    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ''; 

    const threeDays = [data.list[8], data.list[16], data.list[24]];

    threeDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        
        const div = document.createElement('div');
        div.classList.add('forecast-day');
        div.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temp}°C</p>
        `;
        forecastDiv.appendChild(div);
    });
}

apiFetch();

const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error("Error cargando spotlights:", error);
    }
}

function displaySpotlights(members) {
    const qualified = members.filter(member => 
        member.membershipLevel === 3 || member.membershipLevel === 2
    );

    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlights');
    container.innerHTML = ''; 

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.membershipLevel === 3 ? "Gold" : "Silver"} Member</p>
            <hr>
            <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="100">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Web</a>
        `;
        container.appendChild(card);
    });
}

getSpotlights();