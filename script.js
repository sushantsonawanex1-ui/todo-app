const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") return;

    createTask(text, false);
    saveTasks();

    taskInput.value = "";
}

function createTask(text, completed) {

    const li = document.createElement("li");

    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    const del = document.createElement("span");
    del.innerHTML = "🗑️";
    del.className = "delete";

    del.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(del);
    taskList.appendChild(li);
}

function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
