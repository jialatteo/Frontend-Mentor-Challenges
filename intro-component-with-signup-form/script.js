let inputContainers = document.getElementsByClassName("input-container")

for (let i = 0; i < inputContainers.length; i++) {
	let input = inputContainers[i].getElementsByTagName("input")[0]
	let placeholder = input.placeholder
	input.oninvalid = (e) => {
		input.style.border = "1px red solid"
		input.style.outline = "none"
		input.placeholder = ""

		e.preventDefault()
		let errorMessage = inputContainers[i].getElementsByTagName("p")[0]
		errorMessage.style.visibility = "visible"

		let errorIcon = inputContainers[i].getElementsByTagName("svg")[0]
		errorIcon.style.visibility = "visible"
	}

	input.oninput = () => {
		if (input.value == "") {
			input.placeholder = placeholder
		}
		input.style.border = "1px solid hsl(248, 32%, 49%)"

		let errorMessage = inputContainers[i].getElementsByTagName("p")[0]
		errorMessage.style.visibility = "hidden"

		let errorIcon = inputContainers[i].getElementsByTagName("svg")[0]
		errorIcon.style.visibility = "hidden"
	}
}