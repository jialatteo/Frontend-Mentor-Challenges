async function printJSON() {
	const response = await fetch("data.json")
	const json = await response.json()
	console.log(json)
	console.log(json[0])
	console.log(json[0].day)
	console.log(json[0].amount)
}

printJSON()