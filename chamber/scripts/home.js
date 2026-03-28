
const menuBtn = document.getElementById('menu-btn');
const navUl = document.getElementById('primary-nav');

menuBtn.addEventListener('click', () => {
    navUl.classList.toggle('open');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const apiKey = 'b0f3e30b816b797b677145b4052585c3'; 
const lat = -16.4897;
const lon = -68.1193;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        
        document.getElementById('current-weather').innerHTML = `
            <div class="weather-current-box">
                <img src="${weatherIcon}" alt="${data.weather[0].description}">
                <p><strong>${Math.round(data.main.temp)}°C</strong></p>
                <p>${data.weather[0].description}</p>
            </div>
        `;

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        
        const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '<h4>3-Day Forecast</h4>';
        
        dailyData.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'short'});
            forecastContainer.innerHTML += `<p>${date}: <strong>${Math.round(day.main.temp)}°C</strong></p>`;
        });

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}
fetchWeather();

const membersURL = 'data/members.json';

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);
        const members = await response.json();

        const eligibleMembers = members.filter(m => m.level >= 2);

        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3); 

        const container = document.querySelector('.spotlight-container');
        container.innerHTML = ''; 
        
        spotlights.forEach(member => {
            const levelName = member.level === 3 ? 'Gold Member' : 'Silver Member';
            container.innerHTML += `
                <div class="spotlight-card">
                    <h4>${member.name}</h4>
                    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                    <p>📞 ${member.phone}</p>
                    <p>📍 ${member.address}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p class="level-badge">${levelName}</p>
                </div>
            `;
        });
    } catch (error) {
         console.error("Error loading spotlights:", error);
    }
}
loadSpotlights();