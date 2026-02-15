# Observer Pattern — File Upload Processing Pipeline

A Node.js + TypeScript demo that implements the Observer Pattern in a realistic server-side context: a file upload processing pipeline with an activity log.

## Why the Observer Pattern?

JavaScript is inherently event-driven. The `addEventListener` in the DOM, reactive frameworks like Vue and React, and libraries like RxJS all build on the same core idea: **when something changes, notify everyone who cares**.

The Observer Pattern formalizes this with two roles:

- **Subject (Observable)** — holds state and broadcasts changes to registered listeners
- **Observer** — a function that reacts to those changes

This decoupling means the Subject doesn't need to know _what_ its Observers do — only that they exist. Observers can be added or removed at runtime without touching the Subject's code.

## What This Project Does

A file upload server with two parts:

**Already provided:**
- Express server with file upload (Multer) and JSON persistence
- Frontend with upload form and image preview grid
- Domain entities, value objects, and event types

**Your task — add the Observer Pattern:**
- Implement the **Subject** (subscribe, unsubscribe, notify)
- Implement the **Activity Log Observer** that logs every upload to `data/activity.json`
- Wire the observer into the upload handler
- Display the activity timeline on the frontend

## Goals

- Demonstrate the Observer Pattern in a real server-side scenario
- Show TypeScript's value for enforcing pattern contracts via types
- Produce observable side effects (files created, logs written) so the pattern's behavior is visible

## Prerequisites

- **Node.js** >= 18
- **npm**

## Tech Stack

- **Express** — web server and routing
- **Multer** — middleware for handling file uploads
- **TypeScript** — type safety and interfaces
- **ts-node** / **nodemon** — development tooling

## Project Structure

```
src/
  index.ts                          # Express server (entry point)
  domain/
    entities/
      UploadedFile.ts               # File entity with status management
    value-objects/
      UploadId.ts, FileName.ts,     # Domain value objects
      FileSize.ts, MimeType.ts
    events/
      FileUploadedEvent.ts          # Domain events
      ThumbnailGeneratedEvent.ts
      FileScanCompletedEvent.ts
    observers/
      Observer.ts                   # Observer type (function signature)
      Subject.ts                    # createSubject() factory (wraps EventEmitter)
      ActivityLogObserver.ts        # Observer function: logs uploads to JSON
views/
  index.html                        # Frontend with upload form + activity timeline
data/                               # Runtime JSON storage (gitignored)
uploads/                            # Uploaded files (gitignored)
docs/
  spec.md                           # Observer Pattern theory
  todo.md                           # Step-by-step student tasks (with hints)
```

## Getting Started

```bash
npm install
npm run dev    # development with auto-reload
npm start      # single run
```

The server will be available at **http://localhost:3000**

## TODO

Follow these steps in order. Each one maps to `TODO` comments in the source files.

### 1. Subject — `src/domain/observers/Subject.ts`

The `createSubject()` factory wraps an `EventEmitter`. Fill in the three functions:

- [ ] **`subscribe`** — call `emitter.on(EVENT_NAME, observer)` to register the observer
- [ ] **`unsubscribe`** — call `emitter.off(EVENT_NAME, observer)` to remove the observer
- [ ] **`notify`** — call `emitter.emit(EVENT_NAME, eventName, data)` to broadcast to all observers

### 2. Activity Log Observer — `src/domain/observers/ActivityLogObserver.ts`

- [ ] **`readLog()`** — if `data/activity.json` exists, read it with `fs.readFileSync` and `JSON.parse`; otherwise return `[]`
- [ ] **`writeLog(entries)`** — write the array to `data/activity.json` with `fs.writeFileSync` and `JSON.stringify(entries, null, 2)`
- [ ] **`activityLogObserver`** — build a `LogEntry` from `eventName` and `data`, call `readLog()`, push the entry, call `writeLog()`
- [ ] **`getActivityLog()`** — return the result of `readLog()`

### 3. Wire it up — `src/index.ts`

- [ ] Uncomment `createSubject()` and `uploadSubject.subscribe(activityLogObserver)`
- [ ] Uncomment `uploadSubject.notify("FileUploaded", fileData)` in the `POST /upload` handler
- [ ] Uncomment the `GET /activity` route

### 4. Frontend — `views/index.html`

- [ ] **`loadActivity()`** — fetch `GET /activity`, parse the JSON, render each entry as a `<li>` inside `#activity-log`
- [ ] Uncomment the `loadActivity()` call after a successful upload

### 5. Verify

- [ ] Run `npm run dev`, upload a file, check the file grid
- [ ] Confirm `data/activity.json` exists with a log entry
- [ ] Confirm the activity timeline shows on the page
- [ ] Upload again and confirm the timeline updates
