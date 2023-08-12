async function printJSON() {
	const response = await fetch("data.json")
	const json = await response.json()
	return json
}

let jsonData = printJSON()
let charts = document.querySelectorAll(".chart")
const MAX_CHART_HEIGHT = 200
jsonData.then((data) => {
	let highestAmount = 0
	
	for (let i = 0; i < data.length; i++) {
		charts[i].amount = data[i].amount
		const tooltip = charts[i].querySelector(".tooltip")
		tooltip.textContent = charts[i].amount
		if (charts[i].amount > highestAmount) {
			highestAmount = charts[i].amount
		}
	}

	charts.forEach(chart => {
		let chartHeight = (chart.amount / highestAmount) * MAX_CHART_HEIGHT
		chart.style.height= chartHeight + "px"
		if (chart.amount == highestAmount) {
			chart.classList.add("max-chart")
		}
	});
})
