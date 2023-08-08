let errorMessage = document.getElementsByClassName("error-message")[0]
let errorIcon = document.getElementsByClassName("error-icon")[0]
let emailInput = document.getElementsByTagName("input")[0]
let placeholder = emailInput.placeholder
let redColor = getComputedStyle(document.body).getPropertyValue('--soft-red')
let borderColor = getComputedStyle(document.body).getPropertyValue('--button-border')
let outlineColor = getComputedStyle(document.body).getPropertyValue('--desaturated-red')


emailInput.oninvalid = (e) => {
	console.log("hi")
	e.preventDefault()
	errorMessage.style.visibility = "visible"
	errorIcon.style.visibility = "visible"
	emailInput.style.border = "1px solid " + redColor.toString()
}

emailInput.oninput = () => {
	if (emailInput.value == "") {
		emailInput.placeholder = placeholder
	}
	errorMessage.style.visibility = "hidden"
	errorIcon.style.visibility = "hidden"
	emailInput.style.border = "1px solid " + borderColor.toString()
}

