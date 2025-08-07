
    let tasks = [];
      const icon = document.getElementById("themeIcon");
    function addTask() {
      const input = document.getElementById("taskInput");
      const task = input.value.trim();
      if (task !== "") {
        tasks.push(task);
        input.value = "";
        displayTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      displayTasks();
    }

    function toggleComplete(event) {
      const item = event.target;
      if (item.tagName === "SPAN") {
        item.classList.toggle("line-through");
        item.classList.toggle("text-gray-500");
      }
    }

    function editTask(index) {
      const newTask = prompt("Edit your task:", tasks[index]);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        displayTasks();
      }
    }

    function displayTasks() {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "bg-purple-50 dark:bg-gray-800 rounded-xl px-4 py-3 flex justify-between items-center hover:bg-purple-100 dark:hover:bg-gray-700 transition";

        const span = document.createElement("span");
        span.textContent = task;
        span.className = "cursor-pointer text-base sm:text-lg";
        span.addEventListener("click", toggleComplete);

        const iconsDiv = document.createElement("div");
        iconsDiv.className = "flex gap-4 text-lg";

        const editBtn = document.createElement("i");
        editBtn.className = "fas fa-pen text-blue-500 hover:text-blue-700 cursor-pointer";
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("i");
        delBtn.className = "fas fa-trash text-red-500 hover:text-red-700 cursor-pointer";
        delBtn.onclick = () => deleteTask(index);

        iconsDiv.appendChild(editBtn);
        iconsDiv.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(iconsDiv);
        list.appendChild(li);
      });
    }

    function toggleDarkMode() {
      const html = document.querySelector("html");
      const icon = document.getElementById("themeIcon");
      html.classList.toggle("dark");

      if (html.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");    
      } else {
        icon.classList.replace("fa-sun", "fa-moon");        
      }
    }