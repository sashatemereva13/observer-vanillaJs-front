# Observer Pattern — File Upload Processing Pipeline

A Node.js + TypeScript demo that implements the Observer Pattern in a realistic server-side context: a file upload processing pipeline.

## Why the Observer Pattern?

JavaScript is inherently event-driven. The `addEventListener` in the DOM, reactive frameworks like Vue and React, and libraries like RxJS all build on the same core idea: **when something changes, notify everyone who cares**.

The Observer Pattern formalizes this with two roles:

- **Subject (Observable)** — holds state and broadcasts changes to registered listeners
- **Observer** — reacts to those changes via an `update` method

This decoupling means the Subject doesn't need to know *what* its Observers do — only that they exist. Observers can be added or removed at runtime without touching the Subject's code.

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

## Getting Started

```bash
npm install
npm run dev    # development with auto-reload
npm start      # single run
```
