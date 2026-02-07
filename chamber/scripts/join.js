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

const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modals = [
    { btn: 'btn-np', modal: 'modal-np' },
    { btn: 'btn-bronze', modal: 'modal-bronze' },
    { btn: 'btn-silver', modal: 'modal-silver' },
    { btn: 'btn-gold', modal: 'modal-gold' }
];

modals.forEach(item => {
    const btn = document.getElementById(item.btn);
    const modal = document.getElementById(item.modal);
    const closeBtn = modal.querySelector('.close-modal');

    if (btn && modal && closeBtn) {
        btn.addEventListener('click', () => {
            modal.showModal();
        });

        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    }
});