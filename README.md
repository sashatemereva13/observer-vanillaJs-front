# Observer Pattern Demo - File Upload Processing

A simple Node.js + TypeScript + Express application demonstrating the **Observer Pattern** through a simulated file upload processing pipeline.

## 🎯 What is the Observer Pattern?

The Observer Pattern is a behavioral design pattern where an object (the **Subject**) maintains a list of dependents (the **Observers**) and notifies them automatically when something happens.

**Real-world analogy:** YouTube subscriptions

- You (Observer) subscribe to a channel (Subject)
- When the channel uploads a video (Event), you get notified
- You can unsubscribe anytime

## 🏗️ Architecture

This demo uses a **functional programming approach** with factory functions instead of classes.

### Key Components

1. **Subject** (`Subject.ts`)
   - Maintains the list of observers
   - Provides `attach()` and `detach()` methods
   - Broadcasts events via `notify()`

2. **Observer** (`Observer.ts`)
   - Type definition for observer functions
   - Each observer is an async function that reacts to events

3. **Event** (`FileUploadedEvent.ts`)
   - Data structure representing "something happened"
   - Contains: fileName, fileSize, uploadedAt timestamp

4. **Concrete Observers** (`observers.ts`)
   - Virus Scanner - Simulates antivirus scanning
   - Thumbnail Generator - Simulates image thumbnail creation
   - Metadata Extractor - Simulates metadata extraction
   - Email Notifier - Simulates sending email notifications
   - Activity Logger - Logs upload activity

## 📊 Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION STARTUP                         │
│                                                                 │
│  1. Server starts                                              │
│  2. All observers attach() to Subject                          │
│     ├─ VirusScanner ✅                                         │
│     ├─ ThumbnailGenerator ✅                                   │
│     ├─ MetadataExtractor ✅                                    │
│     ├─ EmailNotifier ✅                                        │
│     └─ ActivityLogger ✅                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD REQUEST                          │
│                                                                 │
│  POST /upload                                                   │
│  Body: { fileName: "vacation.jpg", fileSize: 2048000 }        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CREATE FILE UPLOADED EVENT                    │
│                                                                 │
│  FileUploadedEvent {                                           │
│    fileName: "vacation.jpg",                                   │
│    fileSize: 2048000,                                          │
│    uploadedAt: Date                                            │
│  }                                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUBJECT NOTIFIES OBSERVERS                    │
│                                                                 │
│  Subject.notify(event) broadcasts to ALL attached observers    │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
    ┌────────────────────┐      ┌────────────────────┐
    │  🛡️ Virus Scanner  │      │ 🖼️ Thumbnail Gen   │
    │                    │      │                    │
    │  - Logs "Scanning" │      │  - Logs "Processing"│
    │  - Delay 1000ms    │      │  - Delay 800ms     │
    │  - Logs "✅ Clean"  │      │  - Logs "✅ Created"│
    └────────────────────┘      └────────────────────┘
                │                           │
                │         ┌─────────────────┴──────────┐
                │         │                            │
                ▼         ▼                            ▼
    ┌────────────────────┐         ┌────────────────────┐
    │ 📊 Metadata Extract│         │ 📧 Email Notifier  │
    │                    │         │                    │
    │ - Logs "Reading"   │         │ - Logs "Sending"   │
    │ - Delay 500ms      │         │ - Delay 600ms      │
    │ - Logs "✅ Extracted"│        │ - Logs "✅ Sent"    │
    └────────────────────┘         └────────────────────┘
                │                            │
                └──────────┬─────────────────┘
                           │
                           ▼
                ┌────────────────────┐
                │ 📝 Activity Logger │
                │                    │
                │ - Logs details     │
                │ - Delay 200ms      │
                │ - Logs "✅ Logged"  │
                └────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ALL OBSERVERS COMPLETE                       │
│                                                                 │
│  Return response: { success: true }                            │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Or build and run production
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### 1. Upload a File (Trigger Observer Pattern)

**POST** `/upload`

Simulates a file upload and triggers all attached observers.

**Request Body:**

```json
{
	"fileName": "vacation.jpg",
	"fileSize": 2048000
}
```

**Response:**

```json
{
	"success": true,
	"message": "File upload processed",
	"fileName": "vacation.jpg",
	"fileSize": 2048000
}
```

**Example with curl:**

```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: application/json" \
  -d '{"fileName": "vacation.jpg", "fileSize": 2048000}'
```

### 2. Detach an Observer

**POST** `/detach/:observer`

Dynamically unsubscribe an observer from the Subject.

**Available observers:** `virus`, `thumbnail`, `metadata`, `email`, `activity`

**Example:**

```bash
# Detach email notifier
curl -X POST http://localhost:3000/detach/email

# Now upload again - email observer won't trigger
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: application/json" \
  -d '{"fileName": "document.pdf", "fileSize": 512000}'
```

**Response:**

```json
{
	"success": true,
	"detached": "email"
}
```

### 3. Reattach an Observer

**POST** `/attach/:observer`

Resubscribe a previously detached observer.

**Example:**

```bash
# Reattach email notifier
curl -X POST http://localhost:3000/attach/email
```

**Response:**

```json
{
	"success": true,
	"attached": "email"
}
```

## 📋 Expected Console Output

When you trigger a file upload, you'll see:

```
📁 FILE UPLOAD EVENT TRIGGERED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 File: vacation.jpg
📏 Size: 2048000 bytes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔔 Subject notifying all observers...

🛡️  Virus Scanner: Scanning vacation.jpg...
🛡️  Virus Scanner: ✅ Clean

🖼️  Thumbnail Generator: Processing vacation.jpg...
🖼️  Thumbnail Generator: ✅ Thumbnail created

📊 Metadata Extractor: Reading vacation.jpg...
📊 Metadata Extractor: ✅ Metadata extracted

📧 Email Notifier: Sending notification for vacation.jpg...
📧 Email Notifier: ✅ Email sent

📝 Activity Logger: Logging upload of vacation.jpg (2048000 bytes)
📝 Activity Logger: ✅ Logged at 2024-02-15T10:30:00.000Z

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ All observers notified!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

After detaching the email observer:

```
❌ EmailNotifier detached from subject
```

Next upload will skip the email observer:

```
📁 FILE UPLOAD EVENT TRIGGERED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 File: document.pdf
📏 Size: 512000 bytes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔔 Subject notifying all observers...

🛡️  Virus Scanner: Scanning document.pdf...
🛡️  Virus Scanner: ✅ Clean

🖼️  Thumbnail Generator: Processing document.pdf...
🖼️  Thumbnail Generator: ✅ Thumbnail created

📊 Metadata Extractor: Reading document.pdf...
📊 Metadata Extractor: ✅ Metadata extracted

📝 Activity Logger: Logging upload of document.pdf (512000 bytes)
📝 Activity Logger: ✅ Logged at 2024-02-15T10:31:00.000Z

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ All observers notified!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Notice: Email Notifier did NOT execute!
```

## 🎓 Learning Objectives

### 1. **Loose Coupling**

Each observer is independent. The virus scanner doesn't know the thumbnail generator exists. They only know about the `FileUploadedEvent`.

### 2. **Dynamic Subscription**

Observers can be attached/detached at runtime without modifying the Subject or other observers.

### 3. **One-to-Many Relationship**

One event (file upload) triggers multiple reactions (scan, thumbnail, email, etc.) automatically.

### 4. **Separation of Concerns**

Each observer has a single responsibility:

- Virus scanner → security
- Thumbnail → image processing
- Email → notifications
- Metadata → data extraction
- Activity log → audit trail

### 5. **EventEmitter Pattern**

Node.js's built-in `EventEmitter` is a production-ready implementation of the Observer pattern. This demo wraps it in a cleaner interface.

## 🧪 Experiment Ideas

Try these to deepen understanding:

1. **Add a new observer**
   - Create `databaseObserver` in `observers.ts`
   - Attach it in `index.ts`
   - See it automatically trigger on uploads

2. **Create observer dependencies**
   - Make thumbnail generator only run if virus scan is clean
   - Requires checking results or using event chaining

3. **Add priority/ordering**
   - Ensure virus scanner always runs first
   - Implement priority queue instead of EventEmitter

4. **Measure performance**
   - Log execution time for each observer
   - Compare sequential vs parallel execution

5. **Error handling**
   - Make an observer throw an error
   - See how it affects other observers
   - Implement error isolation

## 📁 Project Structure

```
/src
  /domain
    /entities
      UploadedFile.ts      # (Optional - not used in simple version)
    /events
      FileUploadedEvent.ts # The event that triggers observers
      index.ts
    /observers
      Observer.ts          # Observer type definition
      Subject.ts           # Subject implementation (EventEmitter wrapper)
      observers.ts         # Concrete observer implementations
    /value-objects
      UploadId.ts          # (Optional - not used in simple version)
      index.ts
  index.ts                 # Express app + wiring
package.json
tsconfig.json
README.md
spec.md
```

## 🔍 Key Files Explained

### `Subject.ts`

The broadcaster that maintains the observer list and notifies them.

**Key methods:**

- `attach(name, observer)` - Subscribe an observer
- `detach(name, observer)` - Unsubscribe an observer
- `notify(event)` - Broadcast event to all observers

### `Observer.ts`

Type definition: `Observer = (event: FileUploadedEvent) => Promise<void>`

### `observers.ts`

Contains all concrete observer implementations:

- Each is an async function
- Takes `FileUploadedEvent` as parameter
- Simulates work with delays
- Logs progress to console

### `FileUploadedEvent.ts`

The event data structure with factory function.

### `index.ts`

Express server that:

1. Attaches all observers on startup
2. Provides endpoints to trigger pattern
3. Allows runtime attach/detach

## 🎯 Use Cases in Real Applications

This pattern is used everywhere:

1. **E-commerce:** Order placed → send email, update inventory, trigger shipping, log analytics
2. **Social Media:** User posts → notify followers, update timeline, trigger moderation, save to DB
3. **File Uploads:** Upload complete → scan for viruses, generate thumbnails, extract metadata, backup to cloud
4. **Monitoring:** Error occurs → log to file, send alert email, update metrics, notify Slack
5. **Game Development:** Player levels up → update UI, play sound, save progress, unlock achievements

## 📚 Further Reading

- [Observer Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/observer)
- [Node.js EventEmitter Documentation](https://nodejs.org/api/events.html)
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns) (Gang of Four)

## 🤝 Contributing

This is an educational project. Feel free to:

- Add more observers
- Improve logging
- Add test files
- Create variations (parallel execution, priority queues, etc.)

## 📝 License

MIT - Use freely for educational purposes
