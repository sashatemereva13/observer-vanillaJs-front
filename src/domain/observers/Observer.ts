// =============================================================================
// Observer Interface
// =============================================================================
// This is the core of the Observer Pattern.
//
// An Observer is any object that wants to be notified when something happens.
// In our case, observers react to click events
//
import { FileUploadedEvent } from "../events/FileUploadedEvent"

// Observer type - a function that reacts to file upload events
export type Observer = (event: FileUploadedEvent) => Promise<void>
