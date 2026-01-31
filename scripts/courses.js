// Array de Cursos (Datos)
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concept of classes and objects.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and focuses on user experience and accessibility.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Elementos del DOM donde vamos a interactuar
const courseListDiv = document.getElementById("course-list");
const totalCreditsSpan = document.getElementById("total-credits");

// Función para pintar los cursos
function renderCourses(filteredCourses) {
    courseListDiv.innerHTML = ""; // Limpiar lista anterior
    
    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-item");
        
        // Si el curso está completado, añadimos una clase CSS especial
        if(course.completed) {
            div.classList.add("completed");
        }
        
        // Construimos el contenido de la tarjeta/barra
        div.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        
        /* Nota: Si quieres que aparezca más info al hacer click o hover,
           puedes agregarla aquí, pero el wireframe solo muestra el título.
        */

        courseListDiv.appendChild(div);
    });

    // Calcular créditos totales usando REDUCE
    const total = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsSpan.textContent = total;
}

// Renderizado inicial (mostrar todos al cargar)
renderCourses(courses);

// Event Listeners para los botones de filtro
document.getElementById("all").addEventListener("click", () => {
    renderCourses(courses);
});

document.getElementById("cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    renderCourses(cseCourses);
});

document.getElementById("wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    renderCourses(wddCourses);
});