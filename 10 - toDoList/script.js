let TODO_INPUT // miejsce, gdzie użytkownik wpisuje treść
let ALERT_INFO // info o braku zadań / konieczności dodania tekstu
let ADD_BTN // przycisk ADD - dodaje nowe elementy do listy
let UL_LIST // nasza lista zadań, tagi <ul></ul>
let ALL_TASKS // lista wszystkich dodanych LI
let POPUP //pobrany popup
let POPUP_INFO // alert w popupie, jak się doda pusty tekst
let POPUP_INPUT //tekst wpisywany w inputa w popup'ie
let ADD_POPUP_BTN // przycisk "zatwierdź" w popup'ie
let CLOSE_TODO_BTN //przycisk od zamykania popup'a

let editedTodo // edytowany Todo
let ID = 0 // ID dodawane do każdego nowego zadania
let newTask // nowo dodany LI, nowe zadanie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	TODO_INPUT = document.querySelector('.todo-input')
	ALERT_INFO = document.querySelector('.alert-info')
	ADD_BTN = document.querySelector('.add-btn')
	UL_LIST = document.querySelector('.todo-list ul')
	ALL_TASKS = document.getElementsByTagName('li')
	POPUP = document.querySelector('.popup')
	POPUP_INFO = document.querySelector('.popup-info')
	POPUP_INPUT = document.querySelector('.popup-input')
	ADD_POPUP_BTN = document.querySelector('.accept')
	CLOSE_TODO_BTN = document.querySelector('.cancel')
	ADD_POPUP_BTN = document.querySelector('.accept')
}

const prepareDOMEvents = () => {
	ADD_BTN.addEventListener('click', addNewTask)
	TODO_INPUT.addEventListener('keyup', enterKeyCheck)
	UL_LIST.addEventListener('click', checkClick)
	CLOSE_TODO_BTN.addEventListener('click', cancelEditing)
	ADD_POPUP_BTN.addEventListener('click', acceptEditing)
}

const addNewTask = () => {
	if (TODO_INPUT.value !== '') {
		ID++
		newTask = document.createElement('li')
		// newTask.innerText = TODO_INPUT.value
		newTask.setAttribute('id', ID)

		newTask.innerHTML = `${TODO_INPUT.value}<div class="tools">
                        <button class="complete"><i class="fas fa-check"></i></button>
                        <button class="edit">EDIT</button>
                        <button class="delete"><i class="fas fa-times"></i></button>
                    </div>`

		UL_LIST.appendChild(newTask)
		TODO_INPUT.value = ''
		ALERT_INFO.innerText = ''
	} else {
		ALERT_INFO.innerText = `Wpisz treść zadania!`
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('complete')) {
			e.target.closest('li').classList.toggle('completed')
			e.target.closest('button').classList.toggle('completed')
		} else if (e.target.closest('button').classList.contains('edit')) {
			editTask(e)
		} else if (e.target.closest('button').classList.contains('delete')) {
			deleteTask(e)
		}
	}
}

const deleteTask = e => {
	e.target.closest('li').remove()

	if (ALL_TASKS.length === 0) {
		ALERT_INFO.innerText = 'Brak zadań na liście.'
	}
}

const editTask = e => {
	const oldTodo = e.target.closest('li').id
	editedTodo = document.getElementById(oldTodo)

	POPUP_INPUT.value = editedTodo.firstChild.textContent
	POPUP.style.display = 'flex'
}

const acceptEditing = () => {
	if (POPUP_INPUT.value !== '') {
		editedTodo.firstChild.textContent = POPUP_INPUT.value
		POPUP.style.display = 'none'
	} else {
		POPUP_INFO.innerHTML = 'Musisz podać jakąś treść!'
	}
}

const cancelEditing = () => {
	POPUP.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', main)
