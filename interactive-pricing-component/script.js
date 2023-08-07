const slider = document.querySelector('input[type="range"]')

slider.addEventListener('input', handleSlide) 

function handleSlide(e) {
	const val = e.currentTarget.value
	const min = e.currentTarget.min
	const max = e.currentTarget.max
	let percentage = (val - min) / (max - min) * 100
	e.currentTarget.style.backgroundSize = `${percentage}%`
}