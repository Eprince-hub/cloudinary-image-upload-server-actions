import { NextRequest, NextResponse } from 'next/server';
import { createUserInsecure } from '../../../../database/queries';
import {
  User,
  userSchema,
} from '../../../../migrations/00000-createTableUsers';
import { cloudinaryUpload } from '../../../../util/cloudinaryUpload';

export type UserRegisterPost =
  | {
      user: Omit<User, 'id'>;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserRegisterPost>> {
  try {
    const formData = await request.formData();

    if (!formData) {
      return NextResponse.json({ error: 'Missing required Data' });
    }

    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response || !response.imageUrl) {
      return NextResponse.json({ error: 'Image upload failed' });
    }

    const body = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      imageUrl: response.imageUrl,
    };

    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        error: JSON.stringify(result.error.issues),
      });
    }

    const user = await createUserInsecure(
      result.data.firstName,
      result.data.lastName,
      result.data.imageUrl,
      'API Upload',
    );

    if (!user) {
      return NextResponse.json({ error: 'User creation failed' });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      error: 'Image upload failed',
    });
  }
}
