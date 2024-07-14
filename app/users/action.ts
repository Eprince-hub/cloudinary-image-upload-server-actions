'use server';

import { createUserInsecure } from '../../database/queries';
import { userSchema } from '../../migrations/00000-createTableUsers';
import { cloudinaryUpload } from '../../util/cloudinaryUpload';

type formDataProps = {
  firstName: string;
  lastName: string;
  formData: FormData | undefined;
};

export async function createUser({
  firstName,
  lastName,
  formData,
}: formDataProps) {
  // Another option is to accept only the formData
  // without the different state variables on the client
  // and extract the firstName and lastName from
  // the formData using formData.get
  // ('firstName') and formData.get('lastName') respectively
  if (!formData) {
    return { error: 'Select an image to continue' };
  }

  if (!firstName || !lastName) {
    return { error: 'Please provide a first and last name' };
  }

  try {
    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response || !response.imageUrl) {
      return { error: 'Image upload failed' };
    }

    const result = userSchema.safeParse({
      firstName,
      lastName,
      imageUrl: response.imageUrl,
    });

    if (!result.success) {
      // Handle Zod error more elegantly
      return { error: JSON.stringify(result.error.issues) };
    }

    const user = await createUserInsecure(
      firstName,
      lastName,
      response.imageUrl,
      'server action',
    );

    if (!user) {
      return { error: 'Registration failed, try again' };
    }

    // Returning user just as an example
    // We don't need to return the user because the user data
    // required in the client is coming from the database
    return { user };
  } catch (uploadError) {
    return { error: (uploadError as Error).message };
  }
}
