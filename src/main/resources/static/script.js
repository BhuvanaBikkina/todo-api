const API_URL = "/tasks";

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.id} - ${task.title}
            (${task.completed ? "Completed" : "Pending"})
            <button onclick="completeTask(${task.id})">
                Complete
            </button>
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {
    const id = document.getElementById("taskId").value;
    const title = document.getElementById("taskTitle").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: parseInt(id),
            title: title,
            completed: false
        })
    });

    loadTasks();
}

async function completeTask(id) {
    await fetch(`${API_URL}/${id}/complete`, {
        method: "PUT"
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();