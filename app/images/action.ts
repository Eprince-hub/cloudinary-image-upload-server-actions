'use server';

import { createImageInsecure } from '../../database/queries';
import { cloudinaryUpload } from '../../util/cloudinaryUpload';

export async function uploadImage(formData: FormData) {
  if (!formData.has('image')) {
    return { error: 'No image selected' };
  }

  try {
    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response.imageUrl) {
      return { error: 'Image upload failed' };
    }

    const image = await createImageInsecure(response.imageUrl, 'server action');

    if (!image) {
      return { error: 'Image upload failed' };
    }

    // Line 15 to 19 above can be done in a single code block like this
    // if (!(await createImageInsecure(response.imageUrl, 'server action'))) {
    //   return { error: 'Image upload failed' };
    // }

    // revalidate the home page to display the new image that is returned from the database
    // revalidatePath('/');

    // You can also return the image and use router.refresh to revalidate from the client component
    return { image };
  } catch (uploadError) {
    return { error: (uploadError as Error).message };
  }
}
