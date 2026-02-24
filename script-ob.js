// ============================================
// OBSERVER PATTERN IMPLEMENTATION
// ============================================

// 1. THE SUBJECT (The Broadcaster)
// This button holds the 'state' of being clicked.
const purchaseButton = document.querySelector("#buy-btn")

// observers
const observerOne = () => {
	console.log("send a notification to the user")
}
const observerTwo = () => {
	console.log("send  notification to the admin")
}
const observerThree = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
	const json = await response.json()
	console.log(json)
}
const observerFour = () => {
	for (let i = 0; i < 10; i++) {
		setTimeout(() => {
			console.log(i, "send email to the user")
		}, i * 1000)
	}
}
const observerFive = () => {
	console.log("send a text to the user")
}
const observerSix = () => {
	console.log("send a text to the admin")
}
const observers = [];

// function to subscribe
const subscribe = (observer) => {
	observers.push(observer);
}

// function to unsubscribe
const unsubscribe = (observer) => {
	const index = observers.indexOf(observer)
	if (index !== -1) observers.splice(index, 1)
}

// cannot change !
const handlePurchaseClick = () => {
	if (observers.length === 0) return alert("No observers registered yet")

	console.log("running observers ...")
	observers.forEach((observer) => observer())
}

// Attach our custom handler to the button

purchaseButton.addEventListener("click", handlePurchaseClick)

// add observers without changing handlePurchaseClick each time
subscribe(observerOne)
subscribe(observerTwo)

subscribe(observerThree)
unsubscribe(observerThree)