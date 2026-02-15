import { UploadId } from "../value-objects/UploadId"

export type ScanResult = "clean" | "threat_detected" | "error"

export type FileScanCompletedEvent = {
	readonly eventName: "FileScanCompleted"
	readonly occurredAt: Date
	readonly uploadId: UploadId
	readonly scanResult: ScanResult
	readonly scanDuration: number // in milliseconds
	readonly reportPath?: string
}

export const createFileScanCompletedEvent = (
	uploadId: UploadId,
	scanResult: ScanResult,
	scanDuration: number,
	reportPath?: string,
): FileScanCompletedEvent => {
	return {
		eventName: "FileScanCompleted",
		occurredAt: new Date(),
		uploadId,
		scanResult,
		scanDuration,
		reportPath,
	}
}
