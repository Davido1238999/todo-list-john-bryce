let input = document.querySelector('.entered-list');
let addBtn = document.querySelector('.add-list');
let tasks = document.querySelector('.tasks');
let form = document.querySelector('.form');
let deleteBtn = document.querySelector('.delete-btn');
let date = document.getElementById('date');
let time = document.getElementById('time');
time.min = new Date().toISOString().split("T")[0];

input.addEventListener(`keyup`, function (event) {
    if (input.value.trim() != 0) {
        addBtn.classList.add(`active`);
    } else {
        addBtn.classList.remove(`active`);
    }
});

addBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    if (input.value && date.value && time.value) {
        let newItem = document.createElement(`div`);
        let newTodo = input.value;
        let endDate = date.value + " " + time.value;
        newItem.classList.add(`item`);
        newItem.innerHTML = `
        <div class="item-text">
        <p> ${newTodo} </p>
        <span> ${endDate} </span>
        </div>
        <div class="item-btn">
            <lord-icon
                class="delete-btn"
                src="https://cdn.lordicon.com/dovoajyj.json"
                trigger="hover"
                style="width:20px;height:25px">
            </lord-icon>
            <lord-icon 
                class="completed-btn"
                src="https://cdn.lordicon.com/hjeefwhm.json"
                trigger="hover"
                style="width:20px;height:25px">
            </lord-icon>
        </div>`;
        tasks.appendChild(newItem);
        input.value = ``;
        time.value = ``;
        date.value = ``;
        saveToLocalStorage(newTodo, endDate);
    } else {
        alert(`Please fill all fields`);
    }
});

tasks.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`delete-btn`)) {
        let todoDiv = e.target.parentElement.parentElement;
        let todoP = todoDiv.children[0];
        let todoDate = todoDiv.children[1];
        todoDiv.remove();
        removeItemFromLocalStorage(todoP, todoDate);
    }
});

tasks.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`completed-btn`)) {
        e.target.parentElement.parentElement.classList.toggle(`completed-btn`);
    }
});

// Save to local Storage
function saveToLocalStorage(newTodo, endDate) {
    let todos;
    let endDates;
    if (localStorage.getItem("todos") === null && localStorage.getItem("endDates") === null) {
        todos = [];
        endDates = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        endDates = JSON.parse(localStorage.getItem("endDates"));
    }
    todos.push(newTodo);
    endDates.push(endDate);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("endDates", JSON.stringify(endDates));

}

// Load From Local Storage
(function loadFromLocalStorage(newTodo, endDate) {
    let todos;
    let endDates;
    if (localStorage.getItem("todos") === null && localStorage.getItem("endDates") === null) {
        todos = [];
        endDates = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        endDates = JSON.parse(localStorage.getItem("endDates"));
        todos.forEach((todo, endDate) => {
            let newItem = document.createElement(`div`);
            newItem.classList.add(`item`);
            newItem.innerHTML = `
            <div class="item-text">
            <p> ${todo} </p>
            <span> ${endDates[endDate]} </span>
            </div>
            <div class="item-btn">
            <lord-icon
                class="delete-btn"
                src="https://cdn.lordicon.com/dovoajyj.json"
                trigger="hover"
                style="width:20px;height:25px">
            </lord-icon>
            <lord-icon 
                class="completed-btn"
                src="https://cdn.lordicon.com/hjeefwhm.json"
                trigger="hover"
                style="width:20px;height:25px">
            </lord-icon>
            </div> `;
            tasks.appendChild(newItem);
        })
    }
})();

function removeItemFromLocalStorage(todoP, todoDate) {
    let todos;
    let endDates;
    if (localStorage.getItem("todos") === null && localStorage.getItem("endDates") === null) {
        todos = [];
        endDates = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        endDates = JSON.parse(localStorage.getItem("endDates"));
    }
    todos.splice(todoP, 1)
    endDates.splice(todoDate, 1)
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("endDates", JSON.stringify(endDates));
}

