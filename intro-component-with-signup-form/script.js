let firstName = document.getElementsByClassName("first-name")[0]
let lastName = document.getElementsByClassName("last-name")[0]
let email = document.getElementsByClassName("email")[0]
let password = document.getElementsByClassName("password")[0]

firstName.oninvalid = (e) => {
	e.preventDefault()	

}