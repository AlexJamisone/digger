import type { FileRouter } from 'uploadthing/next-legacy';
import { createUploadthing } from 'uploadthing/next-legacy';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileCount: 10, maxFileSize: '16MB' },
	}).onUploadComplete(({ file, metadata }) => {
		console.log('this is file', file.url);
		console.log('this is metadata', metadata);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
