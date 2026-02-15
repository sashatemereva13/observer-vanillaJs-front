export type FileUploadedEvent = {
	readonly fileName: string
	readonly fileSize: number
	readonly uploadedAt: Date
}

export const createFileUploadedEvent = (
	fileName: string,
	fileSize: number,
): FileUploadedEvent => {
	return {
		fileName,
		fileSize,
		uploadedAt: new Date(),
	}
}
