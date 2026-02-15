import { randomUUID } from "crypto"

export type UploadId = {
	readonly value: string
}

export const createUploadId = (): UploadId => {
	return { value: randomUUID() }
}

export const uploadIdFromString = (value: string): UploadId => {
	if (!value || value.trim().length === 0) {
		throw new Error("UploadId cannot be empty")
	}

	// Basic UUID validation
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
	if (!uuidRegex.test(value)) {
		throw new Error("UploadId must be a valid UUID")
	}

	return { value }
}

export const uploadIdToString = (uploadId: UploadId): string => {
	return uploadId.value
}

export const uploadIdEquals = (a: UploadId, b: UploadId): boolean => {
	return a.value === b.value
}
