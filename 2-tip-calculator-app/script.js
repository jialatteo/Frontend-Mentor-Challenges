let radioButtons = document.querySelectorAll(".radio-label")
let checkedRadioButton
radioButtons.forEach(radioButton => {
	radioButton.addEventListener("click", () => {
		if (checkedRadioButton != null) {
			checkedRadioButton.classList.remove("radio-label-focus")
		}
		radioButton.classList.add("radio-label-focus")
		checkedRadioButton = radioButton
		console.log(radioButton.innerHTML)
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
let tipInput = document.querySelector(".custom-tip")
tipInput.addEventListener("keydown", validateBillOnKeydown)
tipInput.addEventListener("blur", formatBill)
function validateBillOnKeydown(e) {
	console.log(e.key)
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
peopleInput.addEventListener("input", handleErrorStyle)
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
}

function formatBill(e) {
	if (!e.currentTarget.value) {
		return
	}
 	const trimmedValue = e.currentTarget.value.replace(/^0+(?=\d)/, ''); // Trim leading zeroes
  	const formattedValue = parseFloat(trimmedValue).toFixed(2); // Format to 2 decimal places
	e.currentTarget.value = formattedValue
}

function handleErrorStyle(e) {
	console.log(e.currentTarget.value)
	if (parseInt(e.currentTarget.value) == 0) {
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