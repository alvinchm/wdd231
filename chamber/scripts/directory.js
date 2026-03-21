document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const membersURL = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = ''; 

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="card-content">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p class="membership-level">Level: ${getMembershipLevel(member.level)}</p>
            </div>
        `;
        
        directoryContainer.appendChild(card);
    });
}

function getMembershipLevel(levelNumber) {
    if (levelNumber === 3) return "Gold";
    if (levelNumber === 2) return "Silver";
    return "Member";
}

const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-view");
    directoryContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-view");
    directoryContainer.classList.remove("grid-view");
});

getMembers();