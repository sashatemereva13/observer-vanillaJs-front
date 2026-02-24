import express, { Request, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"

export * from "./domain/entities/UploadedFile"
export * from "./domain/value-objects/UploadId"
export * from "./domain/value-objects/FileName"
export * from "./domain/value-objects/FileSize"
export * from "./domain/value-objects/MimeType"
export * from "./domain/events/FileUploadedEvent"
export * from "./domain/events/ThumbnailGeneratedEvent"
export * from "./domain/events/FileScanCompletedEvent"
export * from "./domain/observers/Observer"
export * from "./domain/observers/Subject"
export { activityLogObserver, getActivityLog } from "./domain/observers/ActivityLogObserver"

import { createSubject } from "./domain/observers/Subject"
import { activityLogObserver, getActivityLog } from "./domain/observers/ActivityLogObserver"

// =============================================================================
// OBSERVER SETUP
// Create a Subject using the factory function and subscribe the
// activityLogObserver function so it gets notified on every upload.
// =============================================================================

// TODO: Create a new Subject with the factory function
const uploadSubject = createSubject()

// TODO: Subscribe the activityLogObserver to the subject
uploadSubject.subscribe(activityLogObserver)

const app = express()
const PORT = 3000

const uploadDir = path.join(__dirname, "../uploads")

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}

const dataFile = path.join(__dirname, "../data/files.json")
const dataDir = path.dirname(dataFile)

if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true })
}
if (!fs.existsSync(dataFile)) {
	fs.writeFileSync(dataFile, "[]")
}

function readFiles(): Array<Record<string, unknown>> {
	return JSON.parse(fs.readFileSync(dataFile, "utf-8"))
}

function saveFile(file: Record<string, unknown>) {
	const files = readFiles()
	files.push(file)
	fs.writeFileSync(dataFile, JSON.stringify(files, null, 2))
}

// Use multer.diskStorage to define:
// - destination: save files to the uploadDir
// - filename: generate a unique name using Date.now() + random number
//   and preserve the original file extension with path.extname()
// Then create the multer instance with: const upload = multer({ storage })

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir)
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
		)
	},
})

const upload = multer({ storage })

// =============================================================================
// Middleware
app.use(express.json()) // to parse JSON request bodies
app.use(express.static("public")) // to serve static files from public/
app.use("/uploads", express.static(uploadDir)) //  to serve uploaded files

// =============================================================================
// Serve the HTML view file located at views/index.html
// Use res.sendFile() with an absolute path via path.join(__dirname, ...)
// =============================================================================

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../views/index.html"))
})

app.get("/files", (req: Request, res: Response) => {
	res.json(readFiles())
})

// =============================================================================
// Activity log endpoint - GET /activity
// Returns the activity log entries as JSON for the frontend timeline.
// =============================================================================

// TODO: Create a GET /activity route that returns getActivityLog() as JSON
app.get("/activity", (req: Request, res: Response) => {
	res.json(getActivityLog())
})

app.post(
	"/upload",
	upload.single("file"),
	async (req: Request, res: Response) => {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" })
		}

		console.log("📁 File uploaded:", req.file.originalname)
		console.log("📍 Saved to:", req.file.path)
		console.log("📊 Size:", req.file.size, "bytes")
		console.log("🔖 MIME type:", req.file.mimetype)

		const fileData = {
			originalName: req.file.originalname,
			filename: req.file.filename,
			size: req.file.size,
			mimetype: req.file.mimetype,
			uploadedAt: new Date().toISOString(),
		}

		saveFile(fileData)

		// TODO: Notify all observers about the upload event
		// Call uploadSubject.notify() with the event name "FileUploaded" and fileData
		uploadSubject.notify("FileUploaded", fileData)

		res.json({
			success: true,
			message: "File uploaded successfully",
			file: fileData,
		})
	},
)

app.listen(PORT, () => {
	console.log("╔══════════════════════════════════════════════╗")
	console.log("║   File Upload Observer Pattern Demo         ║")
	console.log("║   Node.js + TypeScript + Express            ║")
	console.log("╚══════════════════════════════════════════════╝")
	console.log(`\n🚀 Server running at http://localhost:${PORT}`)
	console.log(`📁 Upload directory: ${uploadDir}\n`)
})
