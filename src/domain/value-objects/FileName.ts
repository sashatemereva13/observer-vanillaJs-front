import path from "path"

export type FileName = {
	readonly value: string
	readonly extension: string
	readonly nameWithoutExtension: string
}

export const createFileName = (value: string): FileName => {
	if (!value || value.trim().length === 0) {
		throw new Error("FileName cannot be empty")
	}

	// Check for invalid characters
	const invalidChars = /[<>:"|?*\x00-\x1F]/
	if (invalidChars.test(value)) {
		throw new Error("FileName contains invalid characters")
	}

	// Check for path traversal attempts
	if (value.includes("..") || value.includes("/") || value.includes("\\")) {
		throw new Error(
			"FileName cannot contain path separators or traversal patterns",
		)
	}

	const extension = path.extname(value).toLowerCase()
	const nameWithoutExtension = path.basename(value, extension)

	return {
		value: value.trim(),
		extension,
		nameWithoutExtension,
	}
}

export const fileNameToString = (fileName: FileName): string => {
	return fileName.value
}

export const fileNameEquals = (a: FileName, b: FileName): boolean => {
	return a.value === b.value
}

export const getFileNameExtension = (fileName: FileName): string => {
	return fileName.extension
}

export const getFileNameWithoutExtension = (fileName: FileName): string => {
	return fileName.nameWithoutExtension
}
