const ballImage = document.querySelector('img')
const input = document.querySelector('input')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')

const answers = ['Tak!', 'Nie!', 'Nie interesuj się.', 'Ciężko powiedzieć...']

const shakeBall = () => {
	ballImage.classList.add('shake-animation')

	setTimeout(() => {
		ballImage.classList.remove('shake-animation')
		genAnswer(answers)
	}, 1100)
}

const checkInput = () => {
	error.textContent = ''
	answer.textContent = ''
	if (input.value !== '' && input.value.includes('?')) {
		shakeBall()
	} else getError()
}

const genAnswer = answers => {
	const randomIndex = Math.floor(Math.random() * answers.length)

	answer.innerHTML = `<span>Odpowiedź:</span> ${answers[randomIndex]}`
}

const getError = () => {
	error.textContent = 'Niepoprawnie zadane pytanie :/'
}

ballImage.addEventListener('click', checkInput)
