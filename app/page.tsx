import Image from 'next/image';
import { getImagesInsecure } from '../database/queries';
import { uploadImage } from './images/action';
import ImageFormAction from './images/ImageFormAction';
import ImageFormApi from './images/ImageFormApi';
import ImageUploadForm from './images/ImageUploadForm';

export default async function Home() {
  const images = await getImagesInsecure();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {images.length > 0 && (
          <div className="self-center">
            <h2 className="text-2xl font-bold text-center">Images</h2>
            <ul className="grid grid-cols-6 gap-4 mt-4">
              {images.map((image) => (
                <li key={image.id} className="flex items-center flex-col">
                  <Image
                    src={image.url}
                    alt="Uploaded image"
                    className="w-16 h-16 rounded-full"
                    width={40}
                    height={40}
                  />
                  <span className="block text-sm text-center">
                    {image.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h1 className="text-4xl font-bold self-center">
          Upload Image to Cloudinary
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <ImageFormAction
            formTitle="Only image with server action"
            buttonTitle="Server Action Upload"
            imageFormAction={uploadImage}
          />

          <ImageFormApi
            formTitle="Only image with API route"
            buttonTitle="API Upload"
          />

          <ImageUploadForm />

          <ImageUploadForm />
        </div>
      </main>
    </div>
  );
}
