'use server';

import { v2 as cloudinary } from 'cloudinary';
import { createImageInsecure } from '../../database/queries';

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  if (!formData.has('image')) {
    return { error: 'Please select an image' };
  }

  try {
    const file = formData.get('image') as File;

    if (file.size > 1024 * 1024 * 5) {
      return { error: 'Image is too large' };
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
      return { error: 'Image upload failed' };
    }

    const image = await createImageInsecure(response.secure_url);

    if (!image) {
      return { error: 'Image upload failed' };
    }

    return { image };
  } catch (uploadError) {
    return { error: (uploadError as Error).message };
  }
}
