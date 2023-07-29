let emailInput = document.getElementsByClassName("email-input")[0]
let errorMessage = document.getElementsByClassName("error-message")[0]

function customError(e) {
	e.preventDefault()
	errorMessage.style.visibility = "visible"
	emailInput.style.border = "1px red solid"
	emailInput.style.outline = "none"
}
emailInput.addEventListener('invalid', customError)

function inputStyle(e) {
	errorMessage.style.visibility = "hidden"
	emailInput.style.border = "	1px solid hsl(223, 87%, 63%)"
}
emailInput.addEventListener('input', inputStyle)