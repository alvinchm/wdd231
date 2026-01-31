// 1. Lógica del Footer: Año Actual y Última Modificación
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// document.lastModified ya devuelve una cadena con fecha y hora
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;


// 2. Lógica del Menú Hamburguesa
const menuBtn = document.getElementById("menu");
const navList = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show");
    menuBtn.classList.toggle("open");
});