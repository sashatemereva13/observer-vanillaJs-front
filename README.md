# Observer Pattern — File Upload Processing Pipeline

A Node.js + TypeScript demo that implements the Observer Pattern in a realistic server-side context: a file upload processing pipeline.

## Why the Observer Pattern?

JavaScript is inherently event-driven. The `addEventListener` in the DOM, reactive frameworks like Vue and React, and libraries like RxJS all build on the same core idea: **when something changes, notify everyone who cares**.

The Observer Pattern formalizes this with two roles:

- **Subject (Observable)** — holds state and broadcasts changes to registered listeners
- **Observer** — reacts to those changes via an `update` method

This decoupling means the Subject doesn't need to know _what_ its Observers do — only that they exist. Observers can be added or removed at runtime without touching the Subject's code.

## What This Project Does

When a file is uploaded, the upload event acts as the **Subject** and notifies a pipeline of **Observers**:

- **Virus Scanner** (simulated) — checks the uploaded file
- **Thumbnail Generator** — creates image thumbnails using Sharp
- **Metadata Extractor** — pulls file metadata
- **Database Logger** — logs the upload event
- **Email Notification Sender** — notifies relevant users

Each observer is independent and toggleable, demonstrating how the pattern enables loose coupling and separation of concerns.

## Goals

- Demonstrate the Observer Pattern in a real server-side scenario, not just a textbook example
- Show TypeScript's value for enforcing pattern contracts via interfaces
- Produce observable side effects (files created, logs written) so the pattern's behavior is visible
- Support both sequential (educational) and parallel (production) observer execution
- Allow hands-on experimentation by enabling/disabling individual observers at runtime

## Tech Stack

- **Node.js** + **TypeScript**
- **Express** — HTTP server and file upload handling
- **Sharp** — image thumbnail generation
- **ts-node** / **nodemon** — development tooling

### What each does:

- Express - Web server framework
- Multer - Middleware for handling file uploads
- Cors - Enable CORS for frontend access
- @types/\* - TypeScript type definitions

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
      Observer.ts                   # Observer interface (update method)
      Subject.ts                    # Subject class (subscribe/unsubscribe/notify)
      ActivityLogObserver.ts        # Concrete observer: logs uploads to JSON
views/
  index.html                        # Frontend with upload form + activity timeline
data/                               # Runtime JSON storage (gitignored)
uploads/                            # Uploaded files (gitignored)
docs/
  spec.md                           # Observer Pattern theory
  todo.md                           # Step-by-step student tasks
```

## Getting Started

```bash
npm install
npm run dev    # development with auto-reload
npm start      # single run
```

## Student TODO

Follow these steps in order. Each one maps to TODO comments and commented-out code in the source files.

### 1. Implement the Subject (`src/domain/observers/Subject.ts`)
- [ ] `subscribe(observer)` — add the observer to the internal array
- [ ] `unsubscribe(observer)` — remove the observer from the array
- [ ] `notify(eventName, data)` — call `update()` on every registered observer

### 2. Implement the Activity Log Observer (`src/domain/observers/ActivityLogObserver.ts`)
- [ ] `readLog()` — read and parse `data/activity.json`
- [ ] `writeLog(entries)` — write the entries array back to the file
- [ ] `update(eventName, data)` — build a log entry, read the log, push, write
- [ ] `getActivityLog()` — return all log entries

### 3. Wire the Observer in the server (`src/index.ts`)
- [ ] Create a `Subject` instance and subscribe the `ActivityLogObserver`
- [ ] Call `notify("FileUploaded", fileData)` in the upload handler
- [ ] Uncomment the `GET /activity` route

### 4. Frontend activity timeline (`views/index.html`)
- [ ] Implement `loadActivity()` — fetch `/activity` and render each entry
- [ ] Call `loadActivity()` after a successful upload

### 5. Verify
- [ ] `npm run dev`, upload a file, check the file grid
- [ ] Confirm `data/activity.json` has a log entry
- [ ] Confirm the activity timeline renders on the page

> Full details with hints are in [docs/todo.md](docs/todo.md)
