# Observer Pattern — Student TODO

Follow these steps in order. Each step maps to commented-out code and TODO markers in the source files. Uncomment and complete each section as you go.

## 1. Subject (src/domain/observers/Subject.ts)

- [ ] Implement `subscribe(observer)` — push the observer into the `observers` array
- [ ] Implement `unsubscribe(observer)` — filter out the observer from the array
- [ ] Implement `notify(eventName, data)` — loop through all observers and call `update(eventName, data)` on each one

## 2. Activity Log Observer (src/domain/observers/ActivityLogObserver.ts)

- [ ] Implement `readLog()` — check if `data/activity.json` exists, read it with `fs.readFileSync`, parse the JSON, and return the array
- [ ] Implement `writeLog(entries)` — write the entries array to `data/activity.json` using `fs.writeFileSync` with `JSON.stringify(entries, null, 2)`
- [ ] Implement `update(eventName, data)` in the `ActivityLogObserver` class:
  - Create a `LogEntry` object with `timestamp`, `eventName`, `message`, and `metadata`
  - Read the existing log with `readLog()`
  - Push the new entry
  - Write it back with `writeLog()`
- [ ] Implement `getActivityLog()` — return the result of `readLog()`

## 3. Wire the Observer in the server (src/index.ts)

- [ ] Uncomment the Subject and ActivityLogObserver instantiation (create a `Subject`, create an `ActivityLogObserver`, call `subscribe`)
- [ ] Uncomment `uploadSubject.notify("FileUploaded", fileData)` inside the POST `/upload` handler so the observer gets called on every upload
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
