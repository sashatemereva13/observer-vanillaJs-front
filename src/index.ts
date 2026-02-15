import express, { Request, Response } from "express"
const app = express()
const PORT = 3000

// =============================================================================
// OBSERVER SETUP
// Create a Subject instance (the event emitter) and subscribe the
// ActivityLogObserver to it so it gets notified on every upload.
// =============================================================================

// =============================================================================
// Middleware
app.use(express.json()) // to parse JSON request bodies

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello from the server!" })
})

app.listen(PORT, () => {
	console.log("╔══════════════════════════════════════════════╗")
	console.log("║   Observer Pattern Demo Simple and nice!     ║")
	console.log("║   Node.js + TypeScript + Express             ║")
	console.log("╚══════════════════════════════════════════════╝")
	console.log(`\n🚀 Server running at http://localhost:${PORT}`)
})
