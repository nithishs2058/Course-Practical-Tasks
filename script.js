const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return task.completed === false;
        }

        if (currentFilter === "completed") {
            return task.completed === true;
        }

        return true;

    });

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task as completed");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";
        editButton.type = "button";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    const remainingTasks = tasks.filter(function(task) {
        return task.completed === false;
    }).length;

    taskCount.textContent =
        remainingTasks + (remainingTasks === 1 ? " task left" : " tasks left");

}


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    currentFilter = "all";
    updateFilterButtons();

    displayTasks();

});


taskList.addEventListener("click", function(event) {

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = taskItem.dataset.id;

    const task = tasks.find(function(item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    if (event.target.classList.contains("edit-btn")) {

        const updatedText = prompt("Edit your task:", task.text);

        if (updatedText === null) {
            return;
        }

        if (updatedText.trim() === "") {
            alert("Task cannot be empty.");
            return;
        }

        task.text = updatedText.trim();

        saveTasks();
        displayTasks();

    }

    if (event.target.classList.contains("delete-btn")) {

        const confirmDelete = confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {

            tasks = tasks.filter(function(item) {
                return item.id !== taskId;
            });

            saveTasks();
            displayTasks();

        }

    }

});


taskList.addEventListener("change", function(event) {

    if (event.target.classList.contains("task-checkbox")) {

        const taskItem = event.target.closest(".task-item");

        if (!taskItem) {
            return;
        }

        const taskId = taskItem.dataset.id;

        const task = tasks.find(function(item) {
            return item.id === taskId;
        });

        if (task) {

            task.completed = event.target.checked;

            saveTasks();
            displayTasks();

        }

    }

});


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        updateFilterButtons();
        displayTasks();

    });

});

function updateFilterButtons() {

    filterButtons.forEach(function(button) {

        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );

    });

}

displayTasks();
