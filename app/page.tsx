import Image from 'next/image';
import { getImagesInsecure, getUsersInsecure } from '../database/queries';
import ImageForm from './images/ImageForm';
import UserForm from './users/UserForm';

export default async function Home() {
  const images = await getImagesInsecure();
  const users = await getUsersInsecure();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold self-center">
          Upload Image to Cloudinary
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Display only images */}
          {images.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center">Images</h2>
              <ul className="grid grid-cols-6 gap-4 mt-4">
                {images.map((image) => (
                  <li
                    key={`user-${image.id}`}
                    className="flex items-center flex-col"
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

        <div className="grid grid-cols-2 gap-6">
          {/* Users profile info */}
          {users.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center">Users</h2>
              <ul className="grid grid-cols-6 gap-4 mt-4">
                {users.map((user) => (
                  <li
                    key={`user-${user.id}`}
                    className="flex items-center flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Image
                      src={user.imageUrl}
                      alt="Uploaded image"
                      className="w-7 h-7 rounded-full text-gray-500 dark:text-gray-400 mb-3"
                      width={40}
                      height={40}
                    />
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {user.firstName}
                    </h5>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                      {user.lastName}
                    </p>

                    <span className="text-xs">{user.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <UserForm buttonTitle="Create User" formTitle="Create User Profile" />
        </div>
      </main>
    </div>
  );
}
