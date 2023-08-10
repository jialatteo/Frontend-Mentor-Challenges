let radioButtons = document.querySelectorAll(".radio-label")
let checkedRadioButton
radioButtons.forEach(radioButton => {
	radioButton.addEventListener("click", () => {
		if (checkedRadioButton != null) {
			checkedRadioButton.classList.remove("radio-label-focus")
		}
		radioButton.classList.add("radio-label-focus")
		checkedRadioButton = radioButton
	})
});


let customTip = document.querySelector(".custom-tip")
customTip.addEventListener("click", resetRadioButtons)
function resetRadioButtons() {
	if (checkedRadioButton != null) {
		checkedRadioButton.classList.remove("radio-label-focus")
	}

	radioButtons.forEach(radioButton => {
		radioButton.classList.remove("radio-label-focus")
		radioButton.checked = false
	})
}


let textInputs = document.querySelectorAll('input[type="text"]')
textInputs.forEach(textInput => {
	textInput.addEventListener("paste", validateBillOnKeydown)
})


let billInput = document.querySelector(".bill input")
billInput.addEventListener("keydown", validateBillOnKeydown)
billInput.addEventListener("blur", formatBill)
billInput.addEventListener("input", calculateTipAndTotal)
let tipInput = document.querySelector(".custom-tip")
tipInput.addEventListener("keydown", validateBillOnKeydown)
tipInput.addEventListener("blur", formatBill)
tipInput.addEventListener("input", calculateTipAndTotal)
function validateBillOnKeydown(e) {
	if (e.key == "Enter" 
		|| e.key == "Backspace"
		|| e.key == "Delete"
		|| e.key == "Tab"
		|| e.key == "ArrowLeft"
		|| e.key == "ArrowRight") {
		return
	}

	const currentValue = e.currentTarget.value
	const selectionStart = e.currentTarget.selectionStart
	const newValue = currentValue.slice(0, selectionStart) + e.key + currentValue.slice(selectionStart)
  	const regex = /^\d+(\.\d{0,2})?$/;

	if (!regex.test(newValue)) {
		e.preventDefault()
	}
}



let peopleInput = document.querySelector(".people input")
peopleInput.addEventListener("keydown", validatePeopleOnKeydown)
peopleInput.addEventListener("blur", formatPeople)
peopleInput.addEventListener("input", handlePeopleInput)
peopleInput.addEventListener("input", calculateTipAndTotal)
let peopleError = document.querySelector(".error")

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

function formatPeople(e) {
	if (!e.currentTarget.value) {
		return
	}

	e.currentTarget.value = parseInt(e.currentTarget.value)
	return e.currentTarget.value
}

function formatBill(e) {
	if (!e.currentTarget.value) {
		return
	}
 	const trimmedValue = e.currentTarget.value.replace(/^0+(?=\d)/, ''); // Trim leading zeroes
  	const formattedValue = parseFloat(trimmedValue).toFixed(2); // Format to 2 decimal places
	e.currentTarget.value = formattedValue
	return e.currentTarget.value
}

function handlePeopleInput(e) {
	if (!isValidPeopleInput()) {
		showPeopleError()
	} else {
		hidePeopleError()
	}
}

function isValidPeopleInput() {
	return parseInt(peopleInput.value) != 0
}

function showPeopleError() {
	peopleInput.classList.add("error-border")
	peopleError.style.display = "inline"
}

function hidePeopleError() {
	peopleInput.classList.remove("error-border")	
	peopleError.style.display = "none"
}

function calculateTipAndTotal() {
	console.log("fuck")
	console.log("1 " + peopleInput.value.length != 0)
	console.log("2 " + isValidPeopleInput())
	console.log("3 " + tipInput.value.length != 0)
	console.log("4 " + billInput.value.length != 0)
	if (peopleInput.value.length != 0
		&& isValidPeopleInput()
		&& tipInput.value.length != 0
		&& billInput.value.length != 0) {	
			if (tipInput.value.includes("%")) {
				let tipPercentage = parseInt(tipInput.value.split("%")[0])
				let tip = parseFloat((billInput.value * tipPercentage / 100))
				let numberOfPersons = parseInt(peopleInput.value)
				let tipPerPerson = (tip / numberOfPersons).toFixed(2)
				let bill = parseFloat(billInput.value)
				let total = bill + tip
				let totalPerPerson = (total / numberOfPersons).toFixed(2)
				console.log("calculating")
				showTipAndTotal(tipPerPerson, totalPerPerson)
			} 
		} else {
			reset()
		}
}

let tipDisplay = document.querySelector(".tip-display .display-amount")
let totalDisplay = document.querySelector(".total .display-amount")
function showTipAndTotal(tipPerPerson, totalPerPerson) {
	tipDisplay.textContent = tipPerPerson
	totalDisplay.textContent = totalPerPerson
}

function reset() {
	showTipAndTotal("0.00", "0.00")
}
