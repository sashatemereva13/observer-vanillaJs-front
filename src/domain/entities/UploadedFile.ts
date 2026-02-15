import { UploadId } from "../value-objects/UploadId"
import { FileName } from "../value-objects/FileName"
import { FileSize } from "../value-objects/FileSize"
import { MimeType } from "../value-objects/MimeType"
import { createUploadId } from "../value-objects/UploadId"

export type UploadedFile = {
	readonly id: UploadId
	readonly fileName: FileName
	readonly fileSize: FileSize
	readonly mimeType: MimeType
	readonly path: string
	readonly uploadedAt: Date
	readonly status: FileUploadStatus
}

export type FileUploadStatus = "pending" | "processing" | "completed" | "failed"

export type CreateUploadedFileProps = {
	fileName: FileName
	fileSize: FileSize
	mimeType: MimeType
	path: string
}

export const createUploadedFile = (
	props: CreateUploadedFileProps,
): UploadedFile => {
	const { fileName, fileSize, mimeType, path } = props

	if (!path || path.trim().length === 0) {
		throw new Error("File path cannot be empty")
	}

	return {
		id: createUploadId(),
		fileName,
		fileSize,
		mimeType,
		path,
		uploadedAt: new Date(),
		status: "pending",
	}
}

export const createUploadedFileFromExisting = (
	id: UploadId,
	fileName: FileName,
	fileSize: FileSize,
	mimeType: MimeType,
	path: string,
	uploadedAt: Date,
	status: FileUploadStatus,
): UploadedFile => {
	return {
		id,
		fileName,
		fileSize,
		mimeType,
		path,
		uploadedAt,
		status,
	}
}

export const markAsProcessing = (file: UploadedFile): UploadedFile => {
	return {
		...file,
		status: "processing",
	}
}

export const markAsCompleted = (file: UploadedFile): UploadedFile => {
	return {
		...file,
		status: "completed",
	}
}

export const markAsFailed = (file: UploadedFile): UploadedFile => {
	return {
		...file,
		status: "failed",
	}
}

export const isProcessing = (file: UploadedFile): boolean => {
	return file.status === "processing"
}

export const isCompleted = (file: UploadedFile): boolean => {
	return file.status === "completed"
}

export const isFailed = (file: UploadedFile): boolean => {
	return file.status === "failed"
}
