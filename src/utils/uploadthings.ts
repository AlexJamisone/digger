import {
	generateUploadButton,
	generateUploadDropzone,
} from '@uploadthing/react';

import type { OurFileRouter } from '~/server/uploadthings';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
