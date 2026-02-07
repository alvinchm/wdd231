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

const urlParams = new URLSearchParams(window.location.search);

document.getElementById('result-fname').textContent = urlParams.get('fname');
document.getElementById('result-lname').textContent = urlParams.get('lname');
document.getElementById('result-email').textContent = urlParams.get('email');
document.getElementById('result-phone').textContent = urlParams.get('phone');
document.getElementById('result-org').textContent = urlParams.get('org');
document.getElementById('result-date').textContent = urlParams.get('timestamp');