'use server';

import { revalidatePath } from 'next/cache';
import { createImageInsecure } from '../../database/queries';
import { cloudinaryUpload } from '../../util/cloudinaryUpload';

export async function uploadImage(formData: FormData) {
  try {
    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response || !response.imageUrl) {
      return { message: 'Image upload failed' };
    }

    const image = await createImageInsecure(response.imageUrl, 'server action');

    if (!image) {
      return { message: 'Image upload failed' };
    }

    revalidatePath('/');
  } catch (error) {
    return { message: (error as Error).message };
  }
}
