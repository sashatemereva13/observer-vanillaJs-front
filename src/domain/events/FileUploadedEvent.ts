import { UploadedFile } from "../entities/UploadedFile"

export type FileUploadedEvent = {
	readonly eventName: "FileUploaded"
	readonly occurredAt: Date
	readonly uploadedFile: UploadedFile
}

export const createFileUploadedEvent = (
	uploadedFile: UploadedFile,
): FileUploadedEvent => {
	return {
		eventName: "FileUploaded",
		occurredAt: new Date(),
		uploadedFile,
	}
}
