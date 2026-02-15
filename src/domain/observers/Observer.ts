// =============================================================================
// Observer Type
// =============================================================================
// This is the core of the Observer Pattern.
//
// An Observer is any function that wants to be notified when something happens.
// In our case, observers react to file upload events.
//
// The pattern works like this:
//   1. A "Subject" maintains a list of observers (via EventEmitter)
//   2. When an event occurs, the subject calls every registered observer
//   3. Each observer decides what to do with the event
//
// Think of it like a newsletter:
//   - The Subject is the newsletter publisher
//   - Observers are the subscribers
//   - The function being called is the email arriving in your inbox
// =============================================================================

// Observer type — a function that reacts to events
export type Observer = (eventName: string, data: Record<string, unknown>) => void
