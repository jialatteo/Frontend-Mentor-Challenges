let button = document.getElementsByClassName("share-btn")[0]
let mobileTooltip = document.getElementsByClassName("share-mobile-container")[0]
let desktopTooltip = document.getElementsByClassName("desktop-tooltip")[0]

window.onresize = () => {
	if (document.activeElement === button) {
		console.log("button is active");
		if (window.innerWidth <= 720) {
			mobileTooltip.style.visibility = "visible"
			desktopTooltip.visibility = "hidden"
		} else {
			mobileTooltip.style.visibility = "hidden"
			desktopTooltip.visibility = "visible"
		}
	}
}

button.onfocus = () => {
	if (window.innerWidth <= 720) {
		mobileTooltip.style.visibility = (document.activeElement = button)
										? "visible"
										: "hidden"
	}
}

button.onblur = () => {
	if (window.innerWidth <= 720) {
		mobileTooltip.style.visibility = "hidden"
	}
}
