let button = document.getElementsByClassName("share-btn")[0]
let mobileTooltip = document.getElementsByClassName("share-mobile-container")[0]
button.onclick = () => {
	console.log(screen.width);
	if (screen.width <= 720) {
		mobileTooltip.style.visibility = (getComputedStyle(mobileTooltip).visibility === "hidden")
										? "visible"
										: "hidden"
	}
}