let diceButton = document.querySelector("button")
let idDisplay = document.querySelector("span")
let adviceDisplay = document.querySelector("p")

async function getAdviceSlipJson() {
	try {
		const response = await fetch("https://api.adviceslip.com/advice")
		const advice = await response.json()
		return advice
	} catch (error) {
		console.error(`Error: ${error}`)
		window.alert(`Error: ${error}`)
	}
}

window.addEventListener("load", displayNewAdvice)
diceButton.addEventListener("click", displayNewAdvice)

function displayNewAdvice() {
	diceButton.disabled = true
	console.log("clicked")
	const promise = getAdviceSlipJson()
	promise.then((adviceSlipJson) => {
		idDisplay.textContent = adviceSlipJson.slip.id
		adviceDisplay.textContent = adviceSlipJson.slip.advice
		diceButton.classList.add("spinning")
		diceButton.classList.remove("hover")
		setTimeout(() => {
			diceButton.disabled = false
			diceButton.classList.remove("spinning")
			diceButton.classList.add("hover")
		}, 2000)
	})
}

