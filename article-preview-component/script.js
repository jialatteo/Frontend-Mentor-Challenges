let button = document.getElementsByClassName("share-btn")[0]
let mobileTooltip = document.getElementsByClassName("share-mobile-container")[0]
let desktopTooltip = document.getElementsByClassName("desktop-tooltip")[0]

window.onresize = () => {
	if (window.innerWidth > 720) {
		mobileTooltip.style.visibility = "hidden"
	}
}

button.onfocus = () => {
	if (window.innerWidth <= 720) {
		mobileTooltip.style.visibility = (getComputedStyle(mobileTooltip).visibility === "hidden")
										? "visible"
										: "hidden"
	}
}

button.onblur = () => {
	if (window.innerWidth <= 720) {
		mobileTooltip.style.visibility = (getComputedStyle(mobileTooltip).visibility === "hidden")
										? "visible"
										: "hidden"
	}
}

desktopTooltip.onclick = () => {
	button.blur()	
}