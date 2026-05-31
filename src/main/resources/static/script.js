const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>

        <div class="action-buttons">
            <button class="complete-btn">
                <i class="fa-solid fa-check"></i>
            </button>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    updateStats();

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", () => {
        li.querySelector(".task-text").classList.toggle("completed");
        updateStats();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateStats();
    });
}

function updateStats() {

    const tasks = document.querySelectorAll("#taskList li");

    const completed = document.querySelectorAll(".completed");

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        completed.length;

    document.getElementById("pendingTasks").textContent =
        tasks.length - completed.length;
}

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});