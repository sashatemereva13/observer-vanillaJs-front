// =============================================================================
// Subject (Observable) — Built on Node.js EventEmitter
// =============================================================================
// The Subject is the object being observed. It keeps track of all observers
// and notifies them when something happens.
//
// Node.js provides a built-in pub/sub system called EventEmitter.
// We extend it to create our Subject, adding:
//   - attach(name, observer)  → subscribe an observer to the "FileUploaded" event
//   - detach(name, observer)  → unsubscribe an observer
//   - notify(event)           → emit the event and run all observers sequentially
//
// Why extend EventEmitter?
//   - It gives us .on(), .off(), .listeners() out of the box
//   - It's the same pattern used by streams, HTTP server, process, etc. in Node.js
//   - We add async sequential execution on top, since EventEmitter is sync by default
// =============================================================================

import { EventEmitter } from "events"
import { FileUploadedEvent } from "../events/FileUploadedEvent"

export type ObserverFunction = (event: FileUploadedEvent) => Promise<void>

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const EVENT_NAME = "FileUploaded"

class UploadSubject extends EventEmitter {
	attach(name: string, observer: ObserverFunction): void {
		this.on(EVENT_NAME, observer)
		console.log(`✅ ${name} attached to subject`)
	}

	detach(name: string, observer: ObserverFunction): void {
		this.off(EVENT_NAME, observer)
		console.log(`❌ ${name} detached from subject`)
	}

	async notify(event: FileUploadedEvent): Promise<void> {
		console.log("\n🔔 Subject notifying all observers...\n")

		// EventEmitter.listeners() returns all registered handlers for an event
		// We iterate them sequentially with a delay between each one
		const listeners = this.listeners(EVENT_NAME) as ObserverFunction[]

		for (const listener of listeners) {
			await listener(event)
			await delay(500)
		}
	}
}

// Singleton instance
const subject = new UploadSubject()

export const attach = (name: string, observer: ObserverFunction): void =>
	subject.attach(name, observer)

export const detach = (name: string, observer: ObserverFunction): void =>
	subject.detach(name, observer)

export const notify = (event: FileUploadedEvent): Promise<void> =>
	subject.notify(event)
