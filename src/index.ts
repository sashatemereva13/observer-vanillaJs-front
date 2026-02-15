import express, { Request, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 3000

// Create necessary directories
const uploadDir = path.join(__dirname, "../uploads")
const outputDir = path.join(__dirname, "../output")

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true })
}

// Configure multer for file uploads
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

// Middleware
app.use(express.json())
app.use(express.static("public"))

// Basic route
app.get("/", (req: Request, res: Response) => {
	res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Upload Observer Pattern Demo</title>
        </head>
        <body>
            <h1>🎯 File Upload Observer Pattern Demo</h1>
            <p>Node.js + TypeScript + Express</p>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" required>
                <button type="submit">Upload File</button>
            </form>
        </body>
        </html>
    `)
})

// File upload endpoint (Observer pattern will be triggered here)
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

		// TODO: Trigger Observer Pattern here
		// This is where we'll notify all observers about the file upload

		res.json({
			success: true,
			message: "File uploaded successfully",
			file: {
				originalName: req.file.originalname,
				filename: req.file.filename,
				size: req.file.size,
				mimetype: req.file.mimetype,
			},
		})
	},
)

// Start server
app.listen(PORT, () => {
	console.log("╔══════════════════════════════════════════════╗")
	console.log("║   File Upload Observer Pattern Demo         ║")
	console.log("║   Node.js + TypeScript + Express            ║")
	console.log("╚══════════════════════════════════════════════╝")
	console.log(`\n🚀 Server running at http://localhost:${PORT}`)
	console.log(`📁 Upload directory: ${uploadDir}`)
	console.log(`📂 Output directory: ${outputDir}\n`)
})
