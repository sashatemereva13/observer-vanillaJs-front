// ============================================
// OBSERVER PATTERN IMPLEMENTATION
// ============================================

// 1. THE SUBJECT (The Broadcaster)
// This button holds the 'state' of being clicked.
const purchaseButton = document.querySelector("#buy-btn")
const activityLog = document.querySelector("#activity-log")
const statusBadge = document.querySelector("#status")
const toggleButtons = [
	document.querySelector("#toggle-observer-1"),
	document.querySelector("#toggle-observer-2"),
	document.querySelector("#toggle-observer-3"),
	document.querySelector("#toggle-observer-4"),
]

// Helper function to create delay for educational purposes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to log activity visually
let clickCount = 0
let logEntryCount = 0
function logActivity(message, type = "info", codeRef = null) {
	logEntryCount++
	const timestamp = new Date().toLocaleTimeString()
	const badgeClass =
		type === "success"
			? "bg-success"
			: type === "primary"
				? "bg-primary"
				: type === "warning"
					? "bg-warning"
					: type === "danger"
						? "bg-danger"
						: "bg-info"

	// Add code reference if provided
	const codeSnippet = codeRef
		? `
		<div class="mt-1">
			<small class="text-muted font-monospace">
				📄 script.js:${codeRef.line} → <code>${codeRef.code}</code>
			</small>
		</div>
	`
		: ""

	const logEntry = `
		<div class="mb-2 pb-2 border-bottom" id="log-${logEntryCount}">
			<span class="badge ${badgeClass}">${timestamp}</span>
			<span class="ms-2">${message}</span>
			${codeSnippet}
		</div>
	`

	// Clear initial message if first click
	if (clickCount === 1 && logEntryCount === 1) {
		activityLog.innerHTML = logEntry
	} else {
		activityLog.innerHTML = logEntry + activityLog.innerHTML
	}
}

// 2. THE OBSERVERS (The Listeners)
// These are independent functions that wait for the Subject to notify them.

// Observer 1: Notify the user
const notifyUser = () => {
	logActivity(
		"🔔 <strong>Observer 1:</strong> notifyUser() executing - Showing alert...",
		"success",
		{ line: 67, code: 'alert("Thank you for your purchase!")' },
	)
	alert("Thank you for your purchase!")
	logActivity(
		"✅ <strong>Observer 1:</strong> Alert acknowledged by user",
		"success",
	)
}

// Observer 2: Log transaction to console
const logTransaction = () => {
	const timestamp = new Date()
	console.log("📝 Transaction processed at: " + timestamp)
	logActivity(
		"📝 <strong>Observer 2:</strong> logTransaction() executed - Logged to console",
		"primary",
		{ line: 69, code: 'console.log("Transaction processed at: " + timestamp)' },
	)
}

// Observer 3: Update UI status (added for demonstration)
const updateStatus = () => {
	statusBadge.innerHTML = `
		<span class="badge bg-success">✓ Observers Notified (${clickCount} time${clickCount > 1 ? "s" : ""})</span>
	`
	logActivity(
		"🔄 <strong>Observer 3:</strong> updateStatus() executed - UI badge updated",
		"info",
		{ line: 75, code: 'statusBadge.innerHTML = "✓ Observers Notified..."' },
	)
}

// adding a new observer
const sendEmail = () => {
	console.log("email sent")
	logActivity("observer4: sendemail() executed")
}


// 3. SUBSCRIPTION (The Registration)
// We 'attach' our observers to the subject.
// The observers array simulates the internal registry that addEventListener maintains.
const observers = [
	{ name: "notifyUser", func: notifyUser, subscribed: true },
	{ name: "logTransaction", func: logTransaction, subscribed: true },
	{ name: "updateStatus", func: updateStatus, subscribed: true },
	{name: "sendEmail", func: sendEmail, subscribed: true },
]

console.log("📌 Registering observers to the subject...")
console.log(
	"✅ Three observers registered: notifyUser, logTransaction, updateStatus",
)

// Function to update toggle button appearance
function updateToggleButton(index) {
	const observer = observers[index]
	const button = toggleButtons[index]

	if (observer.subscribed) {
		button.className = "btn btn-success btn-sm w-100"
		button.innerHTML = `✓ Observer ${index + 1}: Subscribed`
	} else {
		button.className = "btn btn-outline-danger btn-sm w-100"
		button.innerHTML = `✗ Observer ${index + 1}: Unsubscribed`
	}
}

// Add click handlers to toggle buttons
toggleButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		observers[index].subscribed = !observers[index].subscribed
		updateToggleButton(index)

		const action = observers[index].subscribed ? "subscribed" : "unsubscribed"
		const emoji = observers[index].subscribed ? "✅" : "❌"

		console.log(
			`${emoji} Observer ${index + 1} (${observers[index].name}) ${action}`,
		)
		logActivity(
			`${emoji} <strong>Observer ${index + 1}</strong> has been ${action}`,
			observers[index].subscribed ? "success" : "danger",
			{
				line: 110,
				code: "observers[index].subscribed = !observers[index].subscribed",
			},
		)
	})
})

// Custom click handler that demonstrates the Observer Pattern with educational delays
async function handlePurchaseClick() {
	// Disable button during execution to prevent multiple clicks
	purchaseButton.disabled = true
	purchaseButton.innerHTML = "⏳ Processing..."

	clickCount++

	// Log the event trigger
	logActivity(
		"🎯 <strong>CLICK EVENT DETECTED</strong> - Subject beginning to notify observers...",
		"warning",
		{ line: 155, code: "async function handlePurchaseClick() { ... }" },
	)
	console.log(
		`\n🎯 Click #${clickCount} - Subject notifying ${observers.length} observers...`,
	)

	await delay(750) // Educational delay

	// Iterate through observers and execute each with a delay
	for (let i = 0; i < observers.length; i++) {
		const observer = observers[i]

		logActivity(
			`📢 <strong>Subject:</strong> Checking Observer ${i + 1} (${observer.name})...`,
			"warning",
			{ line: 188, code: "if (observer.subscribed) { ... }" },
		)
		console.log(`📢 Checking Observer ${i + 1} (${observer.name})...`)

		await delay(750) // Delay before executing observer

		// Check if observer is subscribed
		if (observer.subscribed) {
			// Execute the observer
			logActivity(`▶️ <strong>Executing:</strong> ${observer.name}()`, "info", {
				line: 150,
				code: "observer.func()",
			})
			observer.func()
		} else {
			// Observer is unsubscribed - skip execution
			logActivity(
				`⊘ <strong>Observer ${i + 1}:</strong> NOT SUBSCRIBED - Skipped execution`,
				"danger",
				{ line: 148, code: "if (observer.subscribed) { ... } else { skip }" },
			)
			console.log(`⊘ Observer ${i + 1} not subscribed - skipped`)
		}

		// Delay after execution (except for the last one before re-enabling)
		if (i < observers.length - 1) {
			await delay(750)
		}
	}

	await delay(750)
	logActivity(
		"✨ <strong>Complete:</strong> All observers have been notified and executed!",
		"warning",
		{ line: 139, code: "for (let i = 0; i < observers.length; i++) { ... }" },
	)
	console.log("✨ All observers notified!\n")

	// Re-enable button
	purchaseButton.disabled = false
	purchaseButton.innerHTML = "🛒 Purchase Now"
}

// Attach our custom handler to the button
purchaseButton.addEventListener("click", handlePurchaseClick)

// 4. NOTIFICATION (The Broadcast)
// When a user clicks the button, the Subject iterates through its
// internal registry (observers array) and calls each observer function
// with a 750ms delay between each call for educational visibility.

// 5. UNSUBSCRIPTION (The Removal)
// If we want to stop an observer, we can remove it from the array.
// Example (commented out):
// observers.splice(observers.indexOf(logTransaction), 1);
// console.log("🗑️ Observer 2 (logTransaction) has been removed");




// Initial console message
console.log("🎯 Observer Pattern Demo Initialized")
console.log("Subject: #buy-btn button")
console.log("Observers: [notifyUser, logTransaction, updateStatus]")
console.log("Delay between observer notifications: 750ms")
console.log("\nClick the button to see the pattern in action!")
