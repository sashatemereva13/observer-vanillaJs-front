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
import { EventEmitter } from "events"
import { FileUploadedEvent } from "../events/FileUploadedEvent"

export type ObserverFunction = (event: FileUploadedEvent) => Promise<void>

// The Subject - maintains the list and notifies observers
const subject = new EventEmitter()

export const attach = (name: string, observer: ObserverFunction): void => {
	subject.on("notify", observer)
	console.log(`✅ ${name} attached to subject`)
}

export const detach = (name: string, observer: ObserverFunction): void => {
	subject.off("notify", observer)
	console.log(`❌ ${name} detached from subject`)
}

export const notify = async (event: FileUploadedEvent): Promise<void> => {
	console.log("\n🔔 Subject notifying all observers...\n")
	subject.emit("notify", event)
}
