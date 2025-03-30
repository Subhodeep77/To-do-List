const inputBox = document.getElementById('input');
const listContainer = document.getElementById('lc');

function addTask() {
    if (inputBox.value === '') {
        alert('You must write some task first!');
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = inputBox.value;

    let span = document.createElement('span');
    span.innerHTML = "\u00d7"; // Close button
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = '';

    saveData();
}

// Use event delegation to handle clicks
listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.classList.add('removing'); // Add animation class
        setTimeout(() => {
            e.target.parentElement.remove();
            saveData();
        }, 300); // Delay removal to match animation time
    }
});

// Save tasks as an array in localStorage
function saveData() {
    let tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent, // Get the text of the task
            checked: li.classList.contains("checked") // Save checked state
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save as JSON
}

// Load tasks on page reload
function showTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => a.checked - b.checked); // Sort: unchecked first

    listContainer.innerHTML = '';

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.text;
        if (task.checked) li.classList.add("checked");

        let span = document.createElement('span');
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}
showTask(); // Load tasks on page load
