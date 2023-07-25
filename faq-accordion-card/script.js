let questions = document.getElementsByClassName("question-and-answer")

for (let i = 0; i < questions.length; i++) {
	questionButton = questions[i].getElementsByClassName("question")[0]
	questionButton.onclick = () => {
		let answer = questions[i].getElementsByTagName("p")[0]
		answer.style.display = (getComputedStyle(answer).display === "none")
												? "block"
												: "none"

		let icon = questions[i].getElementsByTagName("img")[0]
		icon.classList.toggle("flipped-icon")

		let questionText = questions[i].getElementsByTagName("h2")[0]
		questionText.style.fontWeight = (getComputedStyle(questionText).fontWeight === "400")
										? "700"
										: "400"
	}
}