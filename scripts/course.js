const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseContainer = document.getElementById('course-container');
const totalCreditsSpan = document.getElementById('total-credits');

function renderCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.classList.add('course-item');
        if (course.completed) {
            div.classList.add('completed');
        }
        div.innerHTML = `${course.subject} ${course.number}`;
        courseContainer.appendChild(div);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

renderCourses(courses);

document.getElementById('btn-all').addEventListener('click', () => {
    renderCourses(courses);
});

document.getElementById('btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});

document.getElementById('btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});