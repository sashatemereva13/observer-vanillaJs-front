# Observer Pattern — Student TODO

Follow these steps in order. Each step maps to commented-out code and TODO markers in the source files. Uncomment and complete each section as you go.

## 1. Subject (src/domain/observers/Subject.ts)

- [ ] Implement `subscribe(observer)` — use `this.on(EVENT_NAME, observer)` to register the observer
- [ ] Implement `unsubscribe(observer)` — use `this.off(EVENT_NAME, observer)` to remove the observer
- [ ] Implement `notify(eventName, data)` — use `this.emit(EVENT_NAME, eventName, data)` to broadcast to all observers

## 2. Activity Log Observer (src/domain/observers/ActivityLogObserver.ts)

- [ ] Implement `readLog()` — check if `data/activity.json` exists, read it with `fs.readFileSync`, parse the JSON, and return the array
- [ ] Implement `writeLog(entries)` — write the entries array to `data/activity.json` using `fs.writeFileSync` with `JSON.stringify(entries, null, 2)`
- [ ] Implement the `activityLogObserver` function body:
  - Create a `LogEntry` object with `timestamp`, `eventName`, `message`, and `metadata`
  - Read the existing log with `readLog()`
  - Push the new entry
  - Write it back with `writeLog()`
- [ ] Implement `getActivityLog()` — return the result of `readLog()`

## 3. Wire the Observer in the server (src/index.ts)

- [ ] Uncomment the Subject creation (`createSubject()`)
- [ ] Uncomment `uploadSubject.subscribe(activityLogObserver)` to register the observer
- [ ] Uncomment `uploadSubject.notify("FileUploaded", fileData)` inside the POST `/upload` handler
- [ ] Uncomment the `GET /activity` route that returns `getActivityLog()` as JSON

## 4. Frontend activity timeline (views/index.html)

- [ ] Implement `loadActivity()` — fetch `GET /activity`, parse the response, and render each log entry as a list item inside `#activity-log`
- [ ] Uncomment the `loadActivity()` call inside the successful upload handler so the timeline refreshes after each upload

## 5. Test it

- [ ] Start the server with `npm run dev`
- [ ] Upload a file and verify it appears in the file grid
- [ ] Check that `data/activity.json` was created with a log entry
- [ ] Verify the activity timeline renders on the page
- [ ] Upload a second file and confirm the timeline updates
