# Observer Pattern Demo — File Upload Processing

Node.js + TypeScript + Express app demonstrating the **Observer Pattern** through a simulated file upload pipeline.

## Folder Structure

```
src/
  domain/
    entities/
      UploadedFile.ts          # (placeholder)
    events/
      FileUploadedEvent.ts     # Event type + factory function
      index.ts
    observers/
      Observer.ts              # Observer type alias
      Subject.ts               # UploadSubject class (extends EventEmitter)
      observers.ts             # 5 concrete observer functions
    value-objects/
      UploadId.ts              # (placeholder)
  views/
    index.html                 # Frontend (Bootstrap + vanilla JS)
  index.ts                     # Express server entry point
docs/
  spec.md                      # Observer pattern theory
  todo.md                      # Student TODO checklist
```

## Key Components

### Subject (`Subject.ts`)
Wraps Node's `EventEmitter` in an `UploadSubject` class. Adds `attach()`, `detach()`, and an **async sequential `notify()`** that runs listeners one-by-one with a delay. Exported as a singleton with free functions.

### Event (`FileUploadedEvent.ts`)
Readonly type with `fileName`, `fileSize`, `uploadedAt`. Factory function `createFileUploadedEvent()` stamps the current date.

### Observer (`Observer.ts`)
Type alias: `(event: FileUploadedEvent) => Promise<void>`

### Concrete Observers (`observers.ts`)
Five async functions that simulate work with delays and log to console:
- **virusScanObserver** — simulated antivirus scan
- **thumbnailObserver** — simulated thumbnail generation
- **metadataObserver** — simulated metadata extraction
- **emailObserver** — simulated email notification
- **activityLogObserver** — logs upload activity

### Server (`index.ts`)
Express app serving a static HTML page with REST endpoints: `POST /upload`, `POST /detach/:observer`, `POST /attach/:observer`. Most wiring is **commented out** — students uncomment and connect the pieces.

### Frontend (`views/index.html`)
Single-page UI with a button that POSTs to `/upload` via `fetch()`.

## Getting Started

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

## How It Works

1. **Startup** — observers are attached to the subject via `attach()`
2. **Upload request** — `POST /upload` creates a `FileUploadedEvent` and calls `notify()`
3. **Notification** — the subject iterates all registered observers sequentially
4. **Runtime control** — observers can be detached/reattached via REST endpoints
