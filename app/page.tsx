import Image from 'next/image';
import { getImagesInsecure } from '../database/queries';
import ImageForm from './images/ImageForm';

export default async function Home() {
  const images = await getImagesInsecure();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="p-4 max-w-[80%] mx-auto">
          <h1 className="text-4xl font-bold self-center text-center">
            Upload Image to Cloudinary
          </h1>

          {images.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center">Images</h2>
              <ul className="flex gap-4 flex-wrap my-4">
                {images.map((image) => (
                  <li
                    key={`user-${image.id}`}
                    className="flex items-center flex-col bg-teal-100 p-2 rounded-xl"
                  >
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
          <ImageForm formTitle="Upload Image" buttonTitle="Upload Image" />
        </div>
      </main>
    </div>
  );
}
