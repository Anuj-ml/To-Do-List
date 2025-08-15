
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const html = document.querySelector("html");
    const icon = document.getElementById("themeIcon");
    const list = document.getElementById("taskList");
    const input = document.getElementById("taskInput");
    const addTaskBtn = document.querySelector(".addTaskBtn");
    function addTask() {

      const task = input.value.trim();
      if (task !== "") {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        displayTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
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
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    }

    function displayTasks() {

      list.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "bg-purple-100  rounded-xl px-4 py-3 flex justify-between items-center dark:bg-gray-700 transition ";

        const checkdiv = document.createElement("div");
        checkdiv.className = "flex items-center gap-3 pr-3";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "check w-5 h-5 accent-indigo-500 dark:accent-yellow-400";
        checkbox.addEventListener("change", () => {
          if(checkbox.checked) {
            li.classList.replace("bg-purple-100", "bg-purple-200");
            li.classList.replace("dark:bg-gray-700", "dark:bg-gray-600");
          }
          else {
            li.classList.replace("bg-purple-200", "bg-purple-100");
            li.classList.replace("dark:bg-gray-600", "dark:bg-gray-700");
          }
          span.classList.toggle("line-through", checkbox.checked);
          span.classList.toggle("text-gray-500", checkbox.checked);
        });

        checkdiv.appendChild(checkbox);

        const span = document.createElement("span");
        span.textContent = task;
        span.className = "cursor-pointer text-base sm:text-lg";
        span.addEventListener("click", toggleComplete);

        const iconsDiv = document.createElement("div");
        iconsDiv.className = "flex gap-4 text-lg";

        const editBtn = document.createElement("i");
        editBtn.className = "fas fa-pen text-blue-500 dark:text-blue-400 hover:text-blue-700 cursor-pointer";
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("i");
        delBtn.className = "fas fa-trash text-red-500 dark:text-red-400 hover:text-red-700 cursor-pointer";
        delBtn.onclick = () => deleteTask(index);

        iconsDiv.appendChild(editBtn);
        iconsDiv.appendChild(delBtn);

        li.appendChild(checkdiv);
        li.appendChild(span);
        li.appendChild(iconsDiv);
        list.appendChild(li);
      });
    }
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTaskBtn.click();
      }
    });

    function toggleDarkMode() {
      html.classList.toggle("dark");

      if (html.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");    
      } else {
        icon.classList.replace("fa-sun", "fa-moon");        
      }
    }
    displayTasks();