'use server';

import { revalidatePath } from 'next/cache';
import { createImageInsecure } from '../../database/queries';
import { cloudinaryUpload } from '../../util/cloudinaryUpload';

export async function uploadImage(formData: FormData) {
  try {
    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response || !response.imageUrl) {
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

    // To access the image value on the client side, you can use the following code:
    // you can return the image
    // return image;
    // we dont want to do that because our image data is coming from the database

    // revalidate the home page to display the new image that is returned from the database
    revalidatePath('/');
  } catch (uploadError) {
    return { error: (uploadError as Error).message };
  }
}
