/******************************** Elements *******************************************/
let textInputs = document.querySelectorAll('input[type="text"]')
let billInput = document.querySelector(".bill input")
let radioLabels = document.querySelectorAll(".radio-label")
let radioInputs = document.querySelectorAll(".radio-label input")
let checkedRadioButton
let customTipInput = document.querySelector(".custom-tip")
let peopleInput = document.querySelector(".people input")
let peopleError = document.querySelector(".error")
let resetButton = document.querySelector("button")

/******************************** Style Tip Buttons on click *********************************/
radioLabels.forEach(radioLabel => {
	radioLabel.addEventListener("click", () => {
		customTipInput.value = ""
		if (checkedRadioButton != null) {
			checkedRadioButton.classList.remove("radio-label-focus")
		}
		radioLabel.classList.add("radio-label-focus")
		checkedRadioButton = radioLabel
	})
});


customTipInput.addEventListener("click", resetRadioButtons)
customTipInput.addEventListener("click", resetTipAndTotal)
function resetRadioButtons() {
	if (checkedRadioButton != null) {
		checkedRadioButton.classList.remove("radio-label-focus")
	}

	radioLabels.forEach(radioButton => {
		radioButton.classList.remove("radio-label-focus")
		radioButton.querySelector("input").checked = false
	})
}


/********************************* Text Inputs on paste **************************************/
textInputs.forEach(textInput => {
	textInput.addEventListener("paste", validateMoneyOnKeydown)
})


/********************************* Validate on keydown ********************************/
billInput.addEventListener("keydown", validateMoneyOnKeydown)
customTipInput.addEventListener("keydown", validateMoneyOnKeydown)
peopleInput.addEventListener("keydown", validatePeopleOnKeydown)

function validateMoneyOnKeydown(e) {
	if (e.key == "Enter" 
		|| e.key == "Backspace"
		|| e.key == "Delete"
		|| e.key == "Tab"
		|| e.key == "ArrowLeft"
		|| e.key == "ArrowRight") {
		return
	}

	const currentValue = e.currentTarget.value
	if (parseFloat(currentValue) >= 100000) {
		e.preventDefault()
	}
	const selectionStart = e.currentTarget.selectionStart
	const newValue = currentValue.slice(0, selectionStart) + e.key + currentValue.slice(selectionStart)
  	const regex = /^\d+(\.\d{0,2})?$/;

	if (!regex.test(newValue)) {
		e.preventDefault()
	}
}

function validatePeopleOnKeydown(e) {
	if (e.key == "Enter" 
		|| e.key == "Backspace"
		|| e.key == "Delete"
		|| e.key == "Tab"
		|| e.key == "ArrowLeft"
		|| e.key == "ArrowRight") {
		return
	}

  	const regex = /^\d+$/


	if (!regex.test(e.currentTarget.value + e.key)) {
		e.preventDefault()
	}
}


/********************************* Format strings ********************************/
billInput.addEventListener("blur", (e) => {e.currentTarget.value = formatMoneyString(e.currentTarget.value)})
customTipInput.addEventListener("blur", (e) => {e.currentTarget.value = formatMoneyString(e.currentTarget.value)})
peopleInput.addEventListener("blur", (e) => {e.currentTarget.value = formatPeopleString(e.currentTarget.value)})

function formatPeopleString(peopleValue) {
	if (peopleValue.length == 0) {
		return ""
	}
	return parseInt(peopleValue)
}

function formatMoneyString(moneyValue) {
	if (moneyValue.length == 0) {
		return ""
	}
 	const trimmedValue = moneyValue.replace(/^0+(?=\d)/, ''); // Trim leading zeroes
  	const formattedValueString = parseFloat(trimmedValue).toFixed(2); // Format to 2 decimal places
	return formattedValueString
}

/********************************* Error handling ********************************/
peopleInput.addEventListener("input", handlePeopleError)

function handlePeopleError(e) {
	if (peopleInput.value.length != 0 && peopleInput.value == 0) {
		showPeopleError()
	} else {
		hidePeopleError()
	}
}

function showPeopleError() {
	peopleInput.classList.add("error-border")
	peopleError.style.display = "inline"
}

function hidePeopleError() {
	peopleInput.classList.remove("error-border")	
	peopleError.style.display = "none"
}

/*********************************************** Get input values *****************************************************/

function getBill(){
	if (billInput.value.length != 0) {
		return parseFloat(billInput.value)
	}
}

function getPercentageTip() {
	let tipPercentage
	radioLabels.forEach(radioLabel => {
		let radioInput = radioLabel.querySelector("input")
		if (radioInput.checked) {
			tipPercentage = parseInt(radioLabel.textContent)
		}
	})
	return tipPercentage
}

function getCustomTip() {
	if (customTipInput.value.length != 0)	{
		return parseFloat(customTipInput.value)
	}
}

function getPeople() {
	if (peopleInput.value.length != 0 && peopleInput.value != 0) {
		return parseInt(peopleInput.value)
	}
}
/******************************************************** Display/Reset final tip and total *****************************************/
billInput.addEventListener("input", updateTipAndTotal)
customTipInput.addEventListener("input", updateTipAndTotal)
peopleInput.addEventListener("input", updateTipAndTotal)
radioLabels.forEach(radioLabel => {
	radioLabel.addEventListener("click", updateTipAndTotal)
});
resetButton.addEventListener("click", reset)

function updateTipAndTotal() {
	let percentageTipValue = getPercentageTip()
	let customTipValue = getCustomTip()
	let billValue = getBill()
	let peopleValue = getPeople()

	if (billValue
		&& (percentageTipValue || customTipValue)
		&& 	peopleValue) {
			let tip = 0
			if (percentageTipValue) {
				tip = parseFloat((billValue * percentageTipValue / 100))
			}
			if (customTipValue) {
				tip = customTipValue
			}
			
			let totalPerPerson = (billValue + tip) / peopleValue
			let totalPerPersonString = String(totalPerPerson)
			let tipPerPerson = tip / peopleValue
			let tipPerPersonString = String(tipPerPerson)
			showTipAndTotal(formatMoneyString(tipPerPersonString), formatMoneyString(totalPerPersonString))
	} else {
		resetTipAndTotal()
	}
}

let tipDisplay = document.querySelector(".tip-display .display-amount")
let totalDisplay = document.querySelector(".total .display-amount")
function showTipAndTotal(tipPerPerson, totalPerPerson) {
	tipDisplay.textContent = tipPerPerson
	totalDisplay.textContent = totalPerPerson
}

function resetTipAndTotal() {
	showTipAndTotal("0.00", "0.00")
}

function reset() {
	resetTipAndTotal()
	resetRadioButtons()
	textInputs.forEach(textInput => {
		textInput.value = ""
	});
}