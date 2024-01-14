const price = document.querySelector('#price')
const people = document.querySelector('#people')
const tip = document.querySelector('#tip')
const button = document.querySelector('.count')
const errorP = document.querySelector('.error')
let resultP = document.querySelector('.cost-info')
let resultNumber = document.querySelector('.cost')

const CalculateTheBill = () => {
	if (price.value !== '' && people.value !== '' && tip.value > 0) {
		const newPrice = parseFloat(price.value)
		const newTip = parseFloat(tip.value)

		errorP.innerHTML = ''
		const sum = (newPrice + +price.value * newTip) / +people.value

		resultNumber.textContent = sum.toFixed(2)
		resultP.style.display = 'block'
	} else {
		resultP.style.display = 'none'
		errorP.innerHTML = 'Uzupełnij wszystkie pola'
	}
}

button.addEventListener('click', CalculateTheBill)
