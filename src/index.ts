import express from "express"
import path from "path"
// import { attach, detach, notify } from "./domain/observers/Subject"
// import {
// 	virusScanObserver,
// 	thumbnailObserver,
// 	metadataObserver,
// 	emailObserver,
// 	activityLogObserver,
// } from "./domain/observers/observers"
// import { createFileUploadedEvent } from "./domain/events/FileUploadedEvent"

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

// Serve the frontend view
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views/index.html"))
})

// Attach all observers to the subject on startup
// attach("VirusScanner", virusScanObserver)
// attach("ThumbnailGenerator", thumbnailObserver)
// attach("MetadataExtractor", metadataObserver)
// attach("EmailNotifier", emailObserver)
// attach("ActivityLogger", activityLogObserver)

// Simulated file upload endpoint
app.post("/upload", async (req, res) => {
	console.log("\n📁 FILE UPLOAD EVENT TRIGGERED")
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	console.log(`📄 File:  some file ...`)
	console.log(`📏 Size: 777 bytes`)
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

	// Subject notifies all attached observers
	// const event = createFileUploadedEvent(fileName, fileSize)
	// await notify(event)

	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	console.log("✨ All observers notified!")
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

	res.json({
		success: true,
		message: "File upload simulated",
	})
})

// Detach an observer at runtime
// app.post("/detach/:observer", (req, res) => {
// 	const { observer } = req.params

// 	switch (observer) {
// 		case "email":
// 			detach("EmailNotifier", emailObserver)
// 			break
// 		case "thumbnail":
// 			detach("ThumbnailGenerator", thumbnailObserver)
// 			break
// 		case "metadata":
// 			detach("MetadataExtractor", metadataObserver)
// 			break
// 		case "virus":
// 			detach("VirusScanner", virusScanObserver)
// 			break
// 		case "activity":
// 			detach("ActivityLogger", activityLogObserver)
// 			break
// 		default:
// 			return res.status(400).json({ error: "Unknown observer" })
// 	}

// 	res.json({
// 		success: true,
// 		detached: observer,
// 	})
// })

// Reattach an observer
// app.post("/attach/:observer", (req, res) => {
// 	const { observer } = req.params

// 	switch (observer) {
// 		case "email":
// 			attach("EmailNotifier", emailObserver)
// 			break
// 		case "thumbnail":
// 			attach("ThumbnailGenerator", thumbnailObserver)
// 			break
// 		case "metadata":
// 			attach("MetadataExtractor", metadataObserver)
// 			break
// 		case "virus":
// 			attach("VirusScanner", virusScanObserver)
// 			break
// 		case "activity":
// 			attach("ActivityLogger", activityLogObserver)
// 			break
// 		default:
// 			return res.status(400).json({ error: "Unknown observer" })
// 	}

// 	res.json({
// 		success: true,
// 		attached: observer,
// 	})
// })

// Start server
app.listen(PORT, () => {
	console.log("╔══════════════════════════════════════════════╗")
	console.log("║   Observer Pattern Demo - File Upload       ║")
	console.log("║   Node.js + TypeScript + Express            ║")
	console.log("╚══════════════════════════════════════════════╝")
	console.log(`\n🚀 Server running at http://localhost:${PORT}`)
	// console.log("\n📍 Endpoints:")
	// console.log("   POST /upload          - Trigger file upload event")
	// console.log("   POST /detach/:observer - Detach an observer")
	// console.log("   POST /attach/:observer - Reattach an observer")
	// console.log("\n📋 Observers: virus, thumbnail, metadata, email, activity\n")
})
