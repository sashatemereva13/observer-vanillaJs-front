// =============================================================================
// Observer Interface
// =============================================================================
// This is the core of the Observer Pattern.
//
// An Observer is any object that wants to be notified when something happens.
// In our case, observers react to file upload events.
//
// The pattern works like this:
//   1. A "Subject" maintains a list of observers
//   2. When an event occurs, the subject calls update() on every observer
//   3. Each observer decides what to do with the event
//
// Think of it like a newsletter:
//   - The Subject is the newsletter publisher
//   - Observers are the subscribers
//   - update() is the email arriving in your inbox
// =============================================================================

export interface Observer {
	// TODO: Define a method called "update" that:
	// - Takes an "eventName" parameter of type string
	// - Takes a "data" parameter of type Record<string, unknown>
	// - Returns void
	update(eventName: string, data: Record<string, unknown>): void
}
