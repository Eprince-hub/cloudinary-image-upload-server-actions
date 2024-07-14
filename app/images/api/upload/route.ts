import { NextRequest, NextResponse } from 'next/server';
import { createImageInsecure } from '../../../../database/queries';
import { cloudinaryUpload } from '../../../../util/cloudinaryUpload';

export type ImageUploadResponsePost =
  | {
      imageUrl: string;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImageUploadResponsePost>> {
  try {
    const formData = await request.formData();

    if (!formData) {
      return NextResponse.json({ error: 'No image selected' });
    }

    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response || !response.imageUrl) {
      return NextResponse.json({ error: 'Image upload failed' });
    }

    const image = await createImageInsecure(response.imageUrl, 'API Upload');

    if (!image) {
      return NextResponse.json({ error: 'Image upload failed' });
    }

    return NextResponse.json({ imageUrl: 'image.url' });
  } catch (error) {
    return NextResponse.json({
      error: 'Image upload failed',
    });
  }
}
