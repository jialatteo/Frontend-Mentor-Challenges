let ratingButtons = document.getElementsByClassName("circle-btn")
let selectedButton;
for (let i = 0; i < ratingButtons.length; i++) {
	ratingButtons[i].onfocus = () => {
		if (selectedButton) {
			selectedButton.classList.remove("selected")
		}
		ratingButtons[i].classList.add("selected")
		document.getElementsByClassName("rating")[0].innerHTML = ratingButtons[i].innerHTML
		selectedButton = ratingButtons[i]
	}
}

let submitButton = document.getElementsByClassName("submit-btn")[0]
submitButton.onclick = () => {
	if (selectedButton) {
		document.getElementsByClassName("rating-container")[0].style.display = "none"
		document.getElementsByClassName("thank-you-container")[0].style.display = "grid"
	} else {
		alert("Please select a rating")
	}
}