export type FileSize = {
	readonly bytes: number
}

export const createFileSize = (bytes: number): FileSize => {
	if (bytes < 0) {
		throw new Error("FileSize cannot be negative")
	}

	if (!Number.isInteger(bytes)) {
		throw new Error("FileSize must be an integer")
	}

	// Optional: Set a maximum file size (e.g., 100MB)
	const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB in bytes
	if (bytes > MAX_FILE_SIZE) {
		throw new Error(`FileSize cannot exceed ${MAX_FILE_SIZE} bytes (100MB)`)
	}

	return { bytes }
}

export const fileSizeToBytes = (fileSize: FileSize): number => {
	return fileSize.bytes
}

export const fileSizeToKilobytes = (fileSize: FileSize): number => {
	return fileSize.bytes / 1024
}

export const fileSizeToMegabytes = (fileSize: FileSize): number => {
	return fileSize.bytes / (1024 * 1024)
}

export const fileSizeToHumanReadable = (fileSize: FileSize): string => {
	const bytes = fileSize.bytes

	if (bytes < 1024) {
		return `${bytes} B`
	} else if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(2)} KB`
	} else if (bytes < 1024 * 1024 * 1024) {
		return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
	} else {
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
	}
}

export const fileSizeEquals = (a: FileSize, b: FileSize): boolean => {
	return a.bytes === b.bytes
}

export const fileSizeIsGreaterThan = (a: FileSize, b: FileSize): boolean => {
	return a.bytes > b.bytes
}

export const fileSizeIsLessThan = (a: FileSize, b: FileSize): boolean => {
	return a.bytes < b.bytes
}
