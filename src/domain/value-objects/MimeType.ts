export type MimeType = {
	readonly value: string
	readonly type: string // e.g., "image", "application", "video"
	readonly subtype: string // e.g., "jpeg", "pdf", "mp4"
}

export const createMimeType = (value: string): MimeType => {
	if (!value || value.trim().length === 0) {
		throw new Error("MimeType cannot be empty")
	}

	// MIME type format: type/subtype
	const mimeRegex = /^[a-z]+\/[a-z0-9\-\+\.]+$/i
	if (!mimeRegex.test(value)) {
		throw new Error("Invalid MimeType format. Expected format: type/subtype")
	}

	const [type, subtype] = value.toLowerCase().split("/")

	return {
		value: value.toLowerCase(),
		type,
		subtype,
	}
}

export const mimeTypeToString = (mimeType: MimeType): string => {
	return mimeType.value
}

export const mimeTypeEquals = (a: MimeType, b: MimeType): boolean => {
	return a.value === b.value
}

export const isImageMimeType = (mimeType: MimeType): boolean => {
	return mimeType.type === "image"
}

export const isVideoMimeType = (mimeType: MimeType): boolean => {
	return mimeType.type === "video"
}

export const isPdfMimeType = (mimeType: MimeType): boolean => {
	return mimeType.value === "application/pdf"
}

export const isDocumentMimeType = (mimeType: MimeType): boolean => {
	const documentTypes = [
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"text/plain",
	]
	return documentTypes.includes(mimeType.value)
}

export const getMimeTypeCategory = (mimeType: MimeType): string => {
	if (isImageMimeType(mimeType)) return "Image"
	if (isVideoMimeType(mimeType)) return "Video"
	if (isPdfMimeType(mimeType)) return "PDF"
	if (isDocumentMimeType(mimeType)) return "Document"
	return "Other"
}
