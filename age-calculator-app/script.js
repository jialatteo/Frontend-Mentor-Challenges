let day = document.getElementsByClassName("day")[0]
day.MAX_DIGITS = 2
day.addEventListener("keypress", applyRegexOnKeypress)
day.addEventListener("paste", (e) => e.preventDefault())
day.addEventListener("invalid", (e) => e.preventDefault())
day.addEventListener("input", removeErrorOnInput)

let month = document.getElementsByClassName("month")[0]
month.MAX_DIGITS = 2
month.addEventListener("keypress", applyRegexOnKeypress)
month.addEventListener("paste", (e) => e.preventDefault())
month.addEventListener("invalid", (e) => e.preventDefault())
month.addEventListener("input", removeErrorOnInput)

let year = document.getElementsByClassName("year")[0]
year.MAX_DIGITS = 4
year.addEventListener("keypress", applyRegexOnKeypress)
year.addEventListener("paste", (e) => e.preventDefault())
year.addEventListener("invalid", (e) => e.preventDefault())
year.addEventListener("input", removeErrorOnInput)

let form = document.getElementsByTagName("form")[0]
form.addEventListener("submit", validateForm)

let button = document.getElementsByTagName("button")[0]
let errorColor = getComputedStyle(document.body).getPropertyValue('--light-red')
let purpleColor = getComputedStyle(document.body).getPropertyValue('--purple')

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
	if (!isValidDay()) {
		makeRed(day)
	}

	if (!month.validity.valid) {
		showMonthError()
		makeRed(month)
	}

	if (!year.validity.valid) {
		showYearError()
		makeRed(year)
	}

	let d = new Date(year.value, month.value - 1, day.value)
	if (d.getFullYear() != parseInt(year.value)
		|| d.getMonth() != parseInt(month.value) - 1
		|| d.getDate() != parseInt(day.value)) {
		console.log("invalid date!")
	} 
}

function makeRed(input) {
	inputType = input.parentElement.getElementsByClassName("input-type")[0]
	input.style.borderColor = errorColor
	inputType.style.color = errorColor
}

function isValidDay() {
	let validityState = day.validity
	let dayInputContainer = day.parentElement
	let dayErrorMessage = dayInputContainer.getElementsByClassName("error-message")[0]
	let d = new Date(year.value, month.value - 1, day.value)
	let res = true

	if (d.getFullYear() != parseInt(year.value)
 		|| d.getMonth() != parseInt(month.value) - 1
		|| d.getDate() != parseInt(day.value)
		&& (month.validity.valid && year.validity.valid)) {
		dayErrorMessage.textContent = "Must be a valid day"
		res = false
	} else if (validityState.valueMissing) {
		dayErrorMessage.textContent = "This field is required"
		res = false
	} else {
		dayErrorMessage.textContent = ""
	}
	return res
}

function showMonthError() {
	let validityState = month.validity
	let monthInputContainer = month.parentElement
	let monthErrorMessage = monthInputContainer.getElementsByClassName("error-message")[0]

	if (validityState.valueMissing) {
		monthErrorMessage.textContent = "This field is required"
	} else if (validityState.rangeOverflow || validityState.rangeUnderflow) {
		monthErrorMessage.textContent = "Must be a valid month"
	} else {
		monthErrorMessage.textContent = ""
	}
}

function showYearError () {
	let validityState = year.validity
	let yearInputContainer = year.parentElement
	let yearErrorMessage = yearInputContainer.getElementsByClassName("error-message")[0]
	let currentDate = new Date()
	let currentYear = currentDate.getFullYear()

	if (validityState.valueMissing) {
		yearErrorMessage.textContent = "This field is required"
	} else if (parseInt(year.value) > currentYear) {
		yearErrorMessage.textContent = "Must be in the past"
	} else {
		yearErrorMessage.textContent = ""
	}
}

function removeErrorOnInput(e) {
	let inputContainer = e.target.parentElement
	let errorMessage = inputContainer.getElementsByClassName("error-message")[0]
	let inputType = inputContainer.getElementsByClassName("input-type")[0]
	let input = e.target
	errorMessage.textContent = ""
	inputType.style.color = "black"
	input.style.borderColor = "black"
	input.style.outlineColor = purpleColor
}
