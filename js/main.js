const newListBtn = document.querySelector('.btn-new-list')

const removeListsBtn = document.querySelector('.btn-remove-lists')

const changeTitleBtn = document.querySelector('.change-title')

const listsRow = document.querySelector('.main-page__lists-row')

const updateLocal = () => {
    localStorage.setItem('lists', JSON.stringify(listsArr))
}

let id = 0

// Array with prototypes of class List
let listsArr = []

let changerIndicator = false

let activeModalList = false

removeListsBtn.addEventListener('click',() => {

    localStorage.removeItem('lists')

    window.location.reload()

})

function fillHTML(arr) {
    
    let taskNames = arr

    let totalHTML = ``

    for (let i = 0; i < taskNames.length; i++) {
        html = `
        <div class="list-item">
            <input type="checkbox" name="" id="" class="list-item__checkbox">
            <i class="fa-solid fa-check"></i>
            <input type="text" readonly value="${taskNames[i]}" class="list-item__title">
            <button class="list-item__btn">Edit</button>
        </div>
        `
        totalHTML = totalHTML + html
    }

    return totalHTML
}

function removeList() {

    let removeBtns = document.querySelectorAll('.remove-list')

    removeBtns.forEach((el) => {
        
        el.addEventListener('click',eventRemoveList)
        
    })
    
    function eventRemoveList(event) {

        let list = event.target.closest('.list')

        let listTitle = list.querySelector('.list-title').value

        listsArr.forEach((el) => {

            if (el.listName == listTitle) {
                
                let indexElement = listsArr.indexOf(el)

                listsArr = [...listsArr.slice(0,indexElement),...listsArr.slice(indexElement + 1)]

                updateLocal()
            }

        })

        list.style.display = 'none'

    }
}

function editTitle() {

    let changeTitleBtns = document.querySelectorAll('.change-title')

    changeTitleBtns.forEach((el) => {

        el.style.zIndex = 10

        el.style.cursor = 'pointer'

        function editTitleActive(event) {

            el.style.display = 'none'
            
            let list = event.target.closest('.list')
            
            let input = list.querySelector('.list-title')

            input.style.cursor = 'text'

            let saveChangesTitle = list.querySelector('.list-title-check')

            saveChangesTitle.style.opacity = 1

            saveChangesTitle.style.cursor = 'pointer'

            saveChangesTitle.style.pointerEvents = 'all'

            let oldName = input.value
    
            input.readOnly = false

            input.focus()

            el.removeEventListener('click',editTitleActive)

            saveChangesTitle.addEventListener('click',() => {

                input.style.cursor = 'default'

                input.readOnly = true

                let newName = input.value 

                for (let i = 0; i < listsArr.length; i++) {

                    if (listsArr[i].listName == oldName) {
    
                        listsArr[i].listName = newName

                        updateLocal()

                        break
    
                    }
    
                }

                saveChangesTitle.style.opacity = 0

                saveChangesTitle.style.pointerEvents = 'none'

                el.style.display = 'block'

                el.addEventListener('click',editTitleActive)

            })
        }
        
        el.addEventListener('click',editTitleActive)

    })

}

function addNewTaskFunction(event) {

    let list = event.target.closest('.list')

    let listTitle = list.querySelector('.list-title').value

    let newTask = document.createElement('div')

    newTask.classList.add('list-item')

    let taskCheck = document.createElement('input')

    taskCheck.type = 'checkbox'

    taskCheck.classList.add('list-item__checkbox')

    let taskTitle = document.createElement('input')

    taskTitle.classList.add('list-item__title')

    taskTitle.readOnly = true

    taskTitle.value = 'New Task'

    for (let i = 0; i < listsArr.length; i++) {

        if (listsArr[i].listName == listTitle) {

            listsArr[i].listTasks.push(taskTitle.value)

            updateLocal()

            break

        }

    }

    let taskBtn = document.createElement('button') 

    taskBtn.classList.add('list-item__btn')

    taskBtn.innerHTML = 'Edit'

    let taskDone = document.createElement('i')

    taskDone.classList.add('fa-solid','fa-check')

    list.appendChild(newTask)
    
    newTask.appendChild(taskCheck)

    newTask.appendChild(taskDone)
    
    newTask.appendChild(taskTitle)
    
    newTask.appendChild(taskBtn)

    addEventEditTask()
}

function addFunc() {

    let newTaskBtns = document.querySelectorAll('.list-new-task') 

    newTaskBtns.forEach((el) => {

        el.addEventListener('click',addNewTaskFunction)

    })

}

function createTemplate(list) {
    

    return `
            <div class="list" id="${list.listId}">
            <input type="text" class="list-title" value="${list.listName}" readonly>

            <div class="change-title">
                <i class="fa-regular fa-pen-to-square"></i>
            </div>

            <i class="fa-regular fa-circle-check list-title-check"></i>
            
            <hr class="list-hr">
            
            <span class="list-span">
            
            </span>

            <div class="list-new-task">
                + Add new task
            </div>

            <div class="remove-list">
                Delete this list
            </div>

            ${fillHTML(list.listTasks)}

        </div>
    `

}

function addEventEditTask() {

    let editTaskBtns = document.querySelectorAll('.list-item__btn')

    
    editTaskBtns.forEach((el) => {

        function editTaskActive(event) {
    
            let list = event.target.closest('.list')
    
            let listTitle = list.querySelector('.list-title').value
    
            let listItem = event.target.closest('.list-item')
    
            let taskBtn = listItem.querySelector('.list-item__btn')

            let taskTitle = listItem.querySelector('.list-item__title')

            let oldName = taskTitle.value

            taskTitle.readOnly = false

            taskTitle.style.borderBottom = 1 + 'px' + 'solid' + '#fff'

                taskTitle.focus()
    
            taskBtn.innerHTML = 'Save'
    
            el.removeEventListener('click',editTaskActive)

            el.addEventListener('click',() => {

                taskTitle.readOnly = true

                taskTitle.style.borderBottom = 'none'

                taskBtn.innerHTML = 'Edit'

                let newName = taskTitle.value

                for (let i = 0; i < listsArr.length; i++) {

                    if (listsArr[i].listName == listTitle) {

                        for (let j = 0; j < listsArr[i].listTasks.length; j++) {

                            if (listsArr[i].listTasks[j] == oldName) {

                                listsArr[i].listTasks[j] = newName

                                updateLocal()

                                break

                            }

                        }

                    }

                }

                el.addEventListener('click',editTaskActive)

            })
    
        }

        el.addEventListener('click',editTaskActive)

    })

}

setTimeout(() => {

    listsRow.innerHTML = ""

    if (listsArr.length > 0) {

        listsArr.forEach((item) => {
            listsRow.innerHTML += createTemplate(item)
        })

    }

    removeList()

    addFunc()

    addEventEditTask()

    editTitle()

},100)

// Class for prototypes(new lists)
class List {
    constructor(listId,listName,listColor) {
        this.listId = listId
        this.listName = listName
        this.listColor = listColor
        this.listTasks = []
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function addNewList() {

        let taskId = 0

        // new prototype List
        let _newList = new List
    
        listsArr.push(_newList)

        updateLocal()
        // 

        // id for list
        id += 1

        let newList = document.createElement('div')
    
        newList.classList.add('list')

        newList.id = id

        _newList.listId = id

        updateLocal()
    
        // list title and hr
        let listTitle = document.createElement('input')

        listTitle.readOnly = true
        
        listTitle.classList.add('list-title')
        
        listTitle.value = 'New List'

        _newList.listName = listTitle.value

        updateLocal()
        
        let listHr = document.createElement('hr')
        
        listHr.classList.add('list-hr')
        // 

        // add tasks btn
        let addNewTask = document.createElement('div')

        addNewTask.classList.add('list-new-task')

        addNewTask.innerHTML = '+ Add new task'
        // 

        // icon change title
        let changeTitle = document.createElement('div')

        changeTitle.classList.add('change-title')

        changeTitle.style.zIndex = 0

        let ico = document.createElement('i')

        ico.classList.add('fa-regular', 'fa-pen-to-square')
        // 

        // icon save changes for title 
        let saveChangesTitle = document.createElement('i')

        saveChangesTitle.classList.add('list-title-check','fa-regular','fa-circle-check')

        let removeListBtn = document.createElement('div')

        removeListBtn.classList.add('remove-list')

        removeListBtn.innerHTML = 'Delete this list'

        // appending to parent
        listsRow.appendChild(newList)
        newList.appendChild(listTitle)
        newList.appendChild(listHr)
        newList.appendChild(changeTitle)
        changeTitle.appendChild(ico)
        newList.appendChild(saveChangesTitle)
        newList.appendChild(addNewTask)
        newList.appendChild(removeListBtn)

        removeList()
        // 

        // Events, functions, clicks


        // change title
        changeTitle.addEventListener('click',changeTitleFunction)

        function changeTitleFunction() {
            changeTitle.style.display = 'none'

            saveChangesTitle.style.opacity = 1

            saveChangesTitle.style.pointerEvents = 'all'

            listTitle.readOnly = false

            listTitle.style.cursor = 'text'

            changeTitle.removeEventListener('click',changeTitleFunction)

            saveChangesTitle.addEventListener('click',() => {
                changeTitle.style.display = 'block'

                saveChangesTitle.style.opacity = 0

                saveChangesTitle.style.pointerEvents = 'none'

                listTitle.readOnly = true

                listTitle.style.cursor = 'default'

                _newList.listName = listTitle.value

                updateLocal()

                changeTitle.addEventListener('click',changeTitleFunction)
            })
        }
        // 

        // add new task
        addNewTask.addEventListener('click',() => {

            taskId +=1

            let task = document.createElement('div')

            let checkTask = document.createElement('input')

            let titleTask = document.createElement('input')

            let editTask = document.createElement('button')

            let doneTask = document.createElement('i')

            doneTask.classList.add('fa-solid','fa-check')

            task.classList.add('list-item')

            checkTask.type = 'checkbox'

            checkTask.classList.add('list-item__checkbox')
            
            titleTask.classList.add('list-item__title')
            
            titleTask.readOnly = true

            titleTask.value = 'New Task'

            _newList.listTasks.push(titleTask.value)

            updateLocal()

            titleTask.placeholder = 'Write something'

            editTask.classList.add('list-item__btn')

            editTask.innerHTML = 'Edit'

            task.appendChild(checkTask)

            task.appendChild(titleTask)

            task.appendChild(editTask)

            task.appendChild(doneTask)

            newList.appendChild(task)

            // events, functions

            function editTaskFunction() {
    
                let oldName = titleTask.value

                titleTask.readOnly = false

                titleTask.style.borderBottom = 1 + 'px' + 'solid' + '#fff'

                titleTask.focus()

                editTask.innerHTML = 'Save'

                editTask.removeEventListener('click',editTaskFunction)

                editTask.addEventListener('click',() => {

                    titleTask.readOnly = true

                    let newName = titleTask.value

                    for (let i = 0; i < _newList.listTasks.length; i++) {
                        if (_newList.listTasks[i] == oldName) {
                            
                            _newList.listTasks[i] = newName

                            updateLocal()
                        }
                    }

                    editTask.innerHTML = 'Edit'

                    editTask.addEventListener('click',editTaskFunction)
                })
            }

            editTask.addEventListener('click',editTaskFunction)
        })
}

newListBtn.addEventListener('click',addNewList)

if (!localStorage.lists) {
    listsArr = []
} else {
    listsArr = JSON.parse(localStorage.getItem('lists'))
}