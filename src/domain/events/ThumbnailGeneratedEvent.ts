import { UploadId } from "../value-objects/UploadId"

export type ThumbnailGeneratedEvent = {
	readonly eventName: "ThumbnailGenerated"
	readonly occurredAt: Date
	readonly uploadId: UploadId
	readonly thumbnailPath: string
	readonly width: number
	readonly height: number
	readonly generationDuration: number // in milliseconds
}

export const createThumbnailGeneratedEvent = (
	uploadId: UploadId,
	thumbnailPath: string,
	width: number,
	height: number,
	generationDuration: number,
): ThumbnailGeneratedEvent => {
	return {
		eventName: "ThumbnailGenerated",
		occurredAt: new Date(),
		uploadId,
		thumbnailPath,
		width,
		height,
		generationDuration,
	}
}
