// =============================================================================
// Activity Log Observer
// =============================================================================
// This observer listens for upload events and logs them to a JSON file.
// Every time a file is uploaded, a new log entry is appended to data/activity.json
//
// Each log entry should contain:
//   - timestamp: when the event occurred (ISO string)
//   - eventName: the name of the event (e.g. "FileUploaded")
//   - message: a human-readable description (e.g. "File photo.png was uploaded")
//   - metadata: the full event data for reference
//
// This file is then served via a GET /activity endpoint so the frontend
// can display the activity timeline.
// =============================================================================

import { Observer } from "./Observer"
import fs from "fs"
import path from "path"

const activityFile = path.join(__dirname, "../../../data/activity.json")

// =============================================================================
// STEP 1: Define the LogEntry type
// It should have: timestamp (string), eventName (string),
// message (string), metadata (Record<string, unknown>)
// =============================================================================

export type LogEntry = {
	timestamp: string
	eventName: string
	message: string
	metadata: Record<string, unknown>
}

// =============================================================================
// STEP 2: Implement readLog()
// Read data/activity.json, parse it, and return the array of LogEntry.
// If the file doesn't exist, return an empty array.
// =============================================================================

function readLog(): LogEntry[] {
	// TODO: Read the activity file, parse JSON, and return the array
	// Hint: use fs.existsSync() to check if the file exists first
	// Hint: use fs.readFileSync() and JSON.parse()
	console.log("[ActivityLog] readLog() called — TODO: read and parse activity.json")
	return []
}

// =============================================================================
// STEP 3: Implement writeLog(entries)
// Write the full array of log entries back to data/activity.json
// =============================================================================

function writeLog(entries: LogEntry[]): void {
	// TODO: Write the entries array to the activity file as formatted JSON
	// Hint: use fs.writeFileSync() with JSON.stringify(entries, null, 2)
	console.log("[ActivityLog] writeLog() called — TODO: write entries to activity.json")
}

// =============================================================================
// STEP 4: Implement the activityLogObserver function
// This is an Observer function (not a class). When called:
//   1. Build a LogEntry object from the event data
//   2. Read the existing log
//   3. Push the new entry
//   4. Write the updated log back to disk
// =============================================================================

export const activityLogObserver: Observer = (
	eventName: string,
	data: Record<string, unknown>,
): void => {
	// TODO: Create a LogEntry with:
	//   - timestamp: new Date().toISOString()
	//   - eventName: the eventName parameter
	//   - message: build a string like "File <originalName> was uploaded (size bytes)"
	//     using data.originalName and data.size
	//   - metadata: the data parameter

	// TODO: Read existing log entries with readLog()

	// TODO: Push the new entry to the array

	// TODO: Write the updated array with writeLog()

	console.log(`[activityLogObserver] called with "${eventName}" — TODO: create log entry and persist it`)
}

// =============================================================================
// STEP 5: Export a helper to get all log entries (used by the GET /activity route)
// =============================================================================

export function getActivityLog(): LogEntry[] {
	// TODO: Return the result of readLog()
	console.log("[ActivityLog] getActivityLog() called — TODO: return log entries")
	return []
}
