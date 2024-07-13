'use client';

import { uploadImage } from './action';

export default function ImageUploadForm() {
  return (
    <form
      action={uploadImage}
      className="flex flex-col justify-center gap-6 max-w-sm mx-auto"
    >
      <label>
        Select Image:
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          name="image"
          accept="image/*"
        />
      </label>
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Upload
      </button>
    </form>
  );
}
