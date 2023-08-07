const slider = document.querySelector('input[type="range"]')
const pageview = document.querySelector(".pageview span")
const pricing = document.querySelector(".pricing span")
const toggleButton = document.querySelector('input[type="checkbox"]')
const discount = document.querySelector(".discount")
let canApplyDiscount
let normalPrice = 24

slider.addEventListener('input', handleSlide) 
toggleButton.addEventListener('input', handleToggle)

function handleSlide(e) {
	const val = slider.value
	const min = slider.min
	const max = slider.max
	let percentage = (val - min) / (max - min) * 100
	slider.style.backgroundSize = `${percentage}%`
	console.log("pct " + percentage)
	console.log("val " + val)

	if (val == 0) {
		pageview.textContent = "0"
	} else if (val == 1000) {
		pageview.textContent = "≥1M"
	} else {
		pageview.textContent = `${val}K`
	}

	if (val >= 0 && val < 10) {
		normalPrice = 0
	} else if (val >= 10 && val < 50) {
		normalPrice = 8
	} else if (val >= 50 && val < 100) {
		normalPrice = 12
	} else if (val >= 100 && val < 500) {
		normalPrice = 16
	} else if (val >= 500 && val < 1000) {
		normalPrice = 24
	} else {
		normalPrice = 36
	}

	if (canApplyDiscount) {
		pricing.textContent = normalPrice * 0.75
	} else {
		pricing.textContent = normalPrice
	}
}

function handleToggle(e) {
	if (toggleButton.checked) {
		canApplyDiscount = true
		pricing.textContent = normalPrice * 0.75
	} else {
		canApplyDiscount = false
		pricing.textContent = normalPrice
	}
}