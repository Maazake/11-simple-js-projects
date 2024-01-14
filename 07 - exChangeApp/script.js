const currencyOne = document.querySelector('#currency-one')
const amountOne = document.querySelector('.amount-one')
const currencyTwo = document.querySelector('#currency-two')
const amountTwo = document.querySelector('.amount-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

const calculate = () => {
	const currency_one = currencyOne.value
	const currency_two = currencyTwo.value

	fetch(`https://v6.exchangerate-api.com/v6/516db7364096c22c938199ff/latest/${currency_one}`)
		.then(res => res.json())
		.then(data => {
			const rate = data.conversion_rates[currency_two]
			rateInfo.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
			amountTwo.value = (amountOne.value * rate).toFixed(2)
		})
}

const swap = () => {
	const oldValue = currencyOne.value
	currencyOne.value = currencyTwo.value
	currencyTwo.value = oldValue
}

currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
swapBtn.addEventListener('click', swap)

calculate()
