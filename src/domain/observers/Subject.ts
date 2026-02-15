// =============================================================================
// Subject (Observable)
// =============================================================================
// The Subject is the object being observed. It keeps track of all observers
// and notifies them when something happens.
//
// You need to implement 3 methods:
//   - subscribe(observer)   → add an observer to the list
//   - unsubscribe(observer) → remove an observer from the list
//   - notify(eventName, data) → loop through all observers and call update()
// =============================================================================

import { Observer } from "./Observer"

export class Subject {
	// TODO: Create a private array to hold the list of observers
	// Hint: private observers: Observer[] = []
	private observers: Observer[] = []

	subscribe(observer: Observer): void {
		// TODO: Add the observer to the observers array
		// Hint: use Array.push()
		console.log("[Subject] subscribe() called — TODO: add observer to list")
	}

	unsubscribe(observer: Observer): void {
		// TODO: Remove the observer from the observers array
		// Hint: use Array.filter() to keep all observers except the one being removed
		console.log("[Subject] unsubscribe() called — TODO: remove observer from list")
	}

	notify(eventName: string, data: Record<string, unknown>): void {
		// TODO: Loop through all observers and call their update() method
		// Pass eventName and data to each observer's update()
		// Hint: use Array.forEach() or a for...of loop
		console.log(`[Subject] notify("${eventName}") called — TODO: notify all observers`)
	}
}
