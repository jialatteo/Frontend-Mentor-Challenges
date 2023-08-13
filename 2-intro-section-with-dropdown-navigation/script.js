const openMobileMenuIcon = document.querySelector(".sidebar")
const closeMobileMenuIcon = document.querySelector(".close-icon")
const mobileMenu = document.querySelector(".mobile-menu-container")
const mobileFeatures = document.querySelector(".mobile-features")
const mobileCompany = document.querySelector(".mobile-company")
const mobileFeaturesDropdown = document.querySelector(".mobile-features-dropdown")
const mobileCompanyDropdown = document.querySelector(".mobile-company-dropdown")

closeMobileMenuIcon.addEventListener("click", (e) => {mobileMenu.style.display = "none"})
openMobileMenuIcon.addEventListener("click", (e) => {mobileMenu.style.display = "block"})

function toggleCompanyDropdown(e) {
	const downIcon = e.currentTarget.querySelector(".down")
	const upIcon = e.currentTarget.querySelector(".up")
	console.log(getComputedStyle(downIcon).display)
	if (getComputedStyle(downIcon).display == "block") {
		downIcon.style.display = "none"
		upIcon.style.display = "block"
		mobileCompanyDropdown.style.display = "grid"
	} else {
		downIcon.style.display = "block"
		upIcon.style.display = "none"
		mobileCompanyDropdown.style.display = "none"
	}
}

function toggleFeaturesDropdown(e) {
	const downIcon = e.currentTarget.querySelector(".down")
	const upIcon = e.currentTarget.querySelector(".up")
	console.log(getComputedStyle(downIcon).display)
	if (getComputedStyle(downIcon).display == "block") {
		downIcon.style.display = "none"
		upIcon.style.display = "block"
		mobileFeaturesDropdown.style.display = "grid"
	} else {
		downIcon.style.display = "block"
		upIcon.style.display = "none"
		mobileFeaturesDropdown.style.display = "none"
	}
}

mobileFeatures.addEventListener("click", toggleFeaturesDropdown)
mobileCompany.addEventListener("click", toggleCompanyDropdown)

