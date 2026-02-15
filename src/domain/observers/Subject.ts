// =============================================================================
// Subject (Observable) — Built on Node.js EventEmitter
// =============================================================================
// The Subject is the object being observed. It keeps track of all observers
// and notifies them when something happens.
//
// Node.js provides a built-in pub/sub system called EventEmitter.
// We wrap it inside a factory function, exposing:
//   - subscribe(observer)      → register an observer using .on()
//   - unsubscribe(observer)    → remove an observer using .off()
//   - notify(eventName, data)  → broadcast the event using .emit()
//
// Why use EventEmitter?
//   - It gives us .on(), .off(), .listeners() out of the box
//   - It's the same pattern used by streams, HTTP server, process, etc. in Node.js
// =============================================================================

import { EventEmitter } from "events"
import { Observer } from "./Observer"

const EVENT_NAME = "FileUploaded"

export type Subject = {
	subscribe: (observer: Observer) => void
	unsubscribe: (observer: Observer) => void
	notify: (eventName: string, data: Record<string, unknown>) => void
}

export const createSubject = (): Subject => {
	const emitter = new EventEmitter()

	const subscribe = (observer: Observer): void => {
		// TODO: Use emitter.on() to register the observer for EVENT_NAME
		// Hint: emitter.on(EVENT_NAME, observer)
		console.log("[Subject] subscribe() called — TODO: use emitter.on() to register observer")
	}

	const unsubscribe = (observer: Observer): void => {
		// TODO: Use emitter.off() to remove the observer for EVENT_NAME
		// Hint: emitter.off(EVENT_NAME, observer)
		console.log("[Subject] unsubscribe() called — TODO: use emitter.off() to remove observer")
	}

	const notify = (eventName: string, data: Record<string, unknown>): void => {
		// TODO: Use emitter.emit() to broadcast the event to all registered observers
		// Hint: emitter.emit(EVENT_NAME, eventName, data)
		console.log(`[Subject] notify("${eventName}") called — TODO: use emitter.emit() to broadcast`)
	}

	return { subscribe, unsubscribe, notify }
}
