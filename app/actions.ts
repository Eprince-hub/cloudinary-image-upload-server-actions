'use server';

import { v2 as cloudinary } from 'cloudinary';
import { createImageInsecure } from '../database/queries';

export type ImageFormActionProps =
  | { type: 'initial' }
  | { type: 'error'; error: string }
  | { type: 'success'; imageId: number };

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  previousState: ImageFormActionProps,
  formData: FormData,
): Promise<ImageFormActionProps> {
  if (!formData.has('image')) {
    return { type: 'error', error: 'Please select an image' };
  }

  try {
    const file = formData.get('image') as File;

    if (file.size > 1024 * 1024 * 5) {
      return { type: 'error', error: 'Image is too large' };
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const response = await new Promise<CloudinaryResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      },
    );

    if (!response) {
      return { type: 'error', error: 'Image upload failed' };
    }

    const image = await createImageInsecure(response.secure_url);

    if (!image) {
      return { type: 'error', error: 'Image upload failed' };
    }

    return { type: 'success', imageId: image.id };
  } catch (uploadError) {
    return { type: 'error', error: (uploadError as Error).message };
  }
}
