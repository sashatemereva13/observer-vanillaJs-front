import { FileUploadedEvent } from "../events/FileUploadedEvent"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const virusScanObserver = async (
	event: FileUploadedEvent,
): Promise<void> => {
	console.log(`🛡️  Virus Scanner: Scanning ${event.fileName}...`)
	await delay(1000)
	console.log(`🛡️  Virus Scanner: ✅ Clean\n`)
}

export const thumbnailObserver = async (
	event: FileUploadedEvent,
): Promise<void> => {
	console.log(`🖼️  Thumbnail Generator: Processing ${event.fileName}...`)
	await delay(800)
	console.log(`🖼️  Thumbnail Generator: ✅ Thumbnail created\n`)
}

export const metadataObserver = async (
	event: FileUploadedEvent,
): Promise<void> => {
	console.log(`📊 Metadata Extractor: Reading ${event.fileName}...`)
	await delay(500)
	console.log(`📊 Metadata Extractor: ✅ Metadata extracted\n`)
}

export const emailObserver = async (
	event: FileUploadedEvent,
): Promise<void> => {
	console.log(
		`📧 Email Notifier: Sending notification for ${event.fileName}...`,
	)
	await delay(600)
	console.log(`📧 Email Notifier: ✅ Email sent\n`)
}

export const activityLogObserver = async (
	event: FileUploadedEvent,
): Promise<void> => {
	console.log(
		`📝 Activity Logger: Logging upload of ${event.fileName} (${event.fileSize} bytes)`,
	)
	await delay(200)
	console.log(
		`📝 Activity Logger: ✅ Logged at ${event.uploadedAt.toISOString()}\n`,
	)
}
