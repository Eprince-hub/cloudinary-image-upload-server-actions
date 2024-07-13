import { v2 as cloudinary } from 'cloudinary';

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function cloudinaryUpload(formData: FormData, folder: string) {
  const file = formData.get('image') as File;
  if (!file) {
    return { message: 'No image selected' };
  }

  if (!file.type.startsWith('image/')) {
    return { message: 'File is not an image' };
  }

  if (file.size > 1024 * 1024 * 5) {
    return { message: 'Image is too large' };
  }

  if (!file.name) {
    return { message: 'Image name is missing' };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const response = await new Promise<CloudinaryResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            format: 'webp',
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  if (
    !response ||
    typeof response !== 'object' ||
    Array.isArray(response) ||
    !response.secure_url
  ) {
    return { message: 'Image upload failed' };
  }

  return {
    message: 'Image uploaded successfully',
    imageUrl: response.secure_url,
  };
}
