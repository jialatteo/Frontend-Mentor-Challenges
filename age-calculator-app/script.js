let day = document.getElementsByClassName("day")[0]
day.MAX_DIGITS = 2
day.addEventListener("keypress", applyRegexOnKeypress)
day.addEventListener("paste", (e) => e.preventDefault())
day.addEventListener("invalid", (e) => e.preventDefault())
day.addEventListener("input", applyValidStyleOnInput)

let month = document.getElementsByClassName("month")[0]
month.MAX_DIGITS = 2
month.addEventListener("keypress", applyRegexOnKeypress)
month.addEventListener("paste", (e) => e.preventDefault())
month.addEventListener("invalid", (e) => e.preventDefault())
month.addEventListener("input", applyValidStyleOnInput)

let year = document.getElementsByClassName("year")[0]
year.MAX_DIGITS = 4
year.addEventListener("keypress", applyRegexOnKeypress)
year.addEventListener("paste", (e) => e.preventDefault())
year.addEventListener("invalid", (e) => e.preventDefault())
year.addEventListener("input", applyValidStyleOnInput)

let form = document.getElementsByTagName("form")[0]
form.addEventListener("submit", validateForm)

let button = document.getElementsByTagName("button")[0]
let errorColor = getComputedStyle(document.body).getPropertyValue('--light-red')
let lightGreyColor = getComputedStyle(document.body).getPropertyValue('--light-grey')
let smokeyGreyColor = getComputedStyle(document.body).getPropertyValue('--smokey-grey')

function applyRegexOnKeypress(e) {
	if (e.key == "Enter") {
		return
	}
	
	const digitsCount = e.target.MAX_DIGITS
	const pattern = `^[0-9]{1,${digitsCount}}$`
	const regex = new RegExp(pattern);
	if (!regex.test(e.target.value + e.key)) {
		e.preventDefault()
	} 
}

function validateForm(e) {
	e.preventDefault()
	let isValid = checkValidDay() && checkValidMonth() && checkValidYear()
	let d = new Date(year.value, month.value - 1, day.value)
	if (d.getFullYear() == parseInt(year.value)
		&& d.getMonth() == parseInt(month.value) - 1
		&& d.getDate() == parseInt(day.value)
		&& isValid) {
		let age = new Date(new Date() - d)
		let displayAgeYear = age.getFullYear() - 1970
		let displayAgeMonth = age.getMonth()
		let displayAgeDay = age.getDate()
		
		updateAgeDisplay(displayAgeYear, displayAgeMonth, displayAgeDay)
	} else {
		resetAgeDisplay()
	}
}


function resetAgeDisplay() {
	let displayValues = document.getElementsByClassName("value")
	let yearDisplayValue = displayValues[0]
	yearDisplayValue.textContent = "--"
	let monthDisplayValue = displayValues[1]
	monthDisplayValue.textContent = "--"
	let dayDisplayValue = displayValues[2]
	dayDisplayValue.textContent = "--"
}

function updateAgeDisplay(year, month, day) {
	let displayValues = document.getElementsByClassName("value")
	let yearDisplayValue = displayValues[0]
	yearDisplayValue.textContent = year
	let monthDisplayValue = displayValues[1]
	monthDisplayValue.textContent = month
	let dayDisplayValue = displayValues[2]
	dayDisplayValue.textContent = day
}

function applyInvalidStyle(input) {
	inputType = input.parentElement.getElementsByClassName("input-type")[0]
	input.style.borderColor = errorColor
	inputType.style.color = errorColor
}

function applyValidStyle(input) {
	inputType = input.parentElement.getElementsByClassName("input-type")[0]
	input.style.borderColor = lightGreyColor
	inputType.style.color = smokeyGreyColor
}

function applyValidStyleOnInput(e) {
	let inputContainer = e.target.parentElement
	let errorMessage = inputContainer.getElementsByClassName("error-message")[0]
	let inputType = inputContainer.getElementsByClassName("input-type")[0]
	
	errorMessage.textContent = ""
	inputType.style.color = smokeyGreyColor
	e.target.style.borderColor = lightGreyColor
}


function checkValidDay() {
	let validityState = day.validity
	let dayInputContainer = day.parentElement
	let dayErrorMessage = dayInputContainer.getElementsByClassName("error-message")[0]
	let d = new Date(year.value, month.value - 1, day.value)
	let isValid = true

	if (validityState.rangeOverflow || validityState.rangeUnderflow) {
		dayErrorMessage.textContent = "Must be a valid day"
		isValid = false
	} else if (!(d.getFullYear() == parseInt(year.value)
 		&& d.getMonth() == parseInt(month.value) - 1
		&& d.getDate() == parseInt(day.value))
		&& (checkValidMonth() && checkValidYear())) {
		dayErrorMessage.textContent = "Must be a valid date"
		isValid = false
	} else if (validityState.valueMissing) {
		dayErrorMessage.textContent = "This field is required"
		isValid = false
	} else {
		dayErrorMessage.textContent = ""
	}

	if (!isValid) {
		applyInvalidStyle(day)
	} else {
		applyValidStyle(day)
	}
	return isValid
}

function checkValidMonth() {
	let validityState = month.validity
	let monthInputContainer = month.parentElement
	let monthErrorMessage = monthInputContainer.getElementsByClassName("error-message")[0]
	let isValid = true
	if (validityState.valueMissing) {
		monthErrorMessage.textContent = "This field is required"
		isValid = false
	} else if (validityState.rangeOverflow || validityState.rangeUnderflow) {
		monthErrorMessage.textContent = "Must be a valid month"
		isValid = false
	} else {
		monthErrorMessage.textContent = ""
	}

	if (!isValid) {
		applyInvalidStyle(month)
	} else {
		applyValidStyle(month)
	}

	return isValid
}

function checkValidYear () {
	let validityState = year.validity
	let yearInputContainer = year.parentElement
	let yearErrorMessage = yearInputContainer.getElementsByClassName("error-message")[0]
	let currentDate = new Date()
	let d = new Date(year.value, month.value - 1, day.value)
	let isValid = true
	if (validityState.valueMissing) {
		yearErrorMessage.textContent = "This field is required"
		isValid = false
	} else if (d > currentDate) {
		yearErrorMessage.textContent = "Must be in the past"
		isValid = false
	} else if (year.value < 100) {
		yearErrorMessage.textContent = "Must be > 100"
		isValid = false
	} else {
		yearErrorMessage.textContent = ""
	}
	if (!isValid) {
		applyInvalidStyle(year)
	} else {
		applyValidStyle(year)
	}
	return isValid
}
