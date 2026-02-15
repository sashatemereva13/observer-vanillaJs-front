// 1. THE SUBJECT (The Broadcaster)
// This button holds the 'state' of being clicked.
const purchaseButton = document.querySelector("#buy-btn")

// 2. THE OBSERVERS (The Listeners)
// These are independent functions that wait for the Subject to notify them.
const notifyUser = () => alert("Thank you for your purchase!")
const logTransaction = () =>
	console.log("Transaction processed at: " + new Date())

// 3. SUBSCRIPTION (The Registration)
// We 'attach' our observers to the subject.
// The button now maintains a registry of these two functions.
purchaseButton.addEventListener("click", notifyUser)
purchaseButton.addEventListener("click", logTransaction)

// 4. NOTIFICATION (The Broadcast)
// When a user clicks the button, the Subject iterates through its
// internal list and calls both notifyUser() and logTransaction().

// 5. UNSUBSCRIPTION (The Removal)
// If we want to stop logging but keep the alert, we can detach an observer.
// purchaseButton.removeEventListener('click', logTransaction);
