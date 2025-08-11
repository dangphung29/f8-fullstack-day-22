

const todoInput = document.querySelector('.todo-input input')
const taskList = document.querySelector('.task-list')
const addBtn = document.querySelector('.todo-add-button')
const form = document.querySelector('form')



let taskData = JSON.parse(localStorage.getItem('taskList')) ?? []


form.onsubmit = submit
addBtn.onclick = submit



function submit(e) {
    e.preventDefault()
    const data = {
        taskName: todoInput.value,
        isDone: false
    }

    const existedTask = taskData.find((task) => {
        return task.taskName.toLocaleLowerCase() === data.taskName.toLocaleLowerCase()
    })
    // validate chuỗi rống và khoảng trắng
    if (data.taskName.trim() === '') {
        alert(`Hãy nhập gì đó...`)
        todoInput.value = ''
        return
    }

    // Validate task trùng
    if (existedTask) {
        alert(`Task đã tồn tại`)
        todoInput.value = ''
        return
    }

    taskData.unshift(data)
    renderTask()
    todoInput.value = ''
    storageSave()
}

function storageSave() {
    localStorage.setItem('taskList', JSON.stringify(taskData))
}

// Ham render task
function renderTask() {
    const html = taskData.map((task) => {
        let status
        status = task.isDone ? 'checked' : ''
        return `<li>
        <label class="task">
        <input ${status} name="${task.taskName}" hidden id="done-task" type="checkbox">
        <div class="custom-checkbox"> <i class="fa-solid fa-check"></i></div>
        <p class="task-name">${task.taskName}</p>
        </label>
        
        <div class="delete"  name="${task.taskName}">
        <i class="fa-solid fa-x"></i>
        </div>
        </li>`
    }).join('')

    html ? taskList.innerHTML = html : taskList.innerHTML = `<li>Chưa có Task !!!</li>`


    // Lang nghe su kien onchange check box va xu ly luu vao storage

    document.querySelectorAll('#done-task').forEach(cb => {
        cb.addEventListener('change', function () {
            taskData.map((data) => {
                if (data.taskName === this.name) {
                    data.isDone = this.checked
                }
            })
            storageSave()
        })
    })


    document.querySelectorAll('.delete').forEach(delBtn => {
        delBtn.addEventListener('click', function () {
            taskData = taskData.filter((data) => {
                return data.taskName !== this.getAttribute('name')
            })
            storageSave()
            renderTask()
        })
    })


}

renderTask()




