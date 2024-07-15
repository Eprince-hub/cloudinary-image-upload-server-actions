'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../_components/ErrorMessage';

export default function UserFormApi({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  async function userFormApiHandler(formData: FormData) {
    const response = await fetch('users/api/register', {
      method: 'POST',

      // Using FormData API
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.error);
      return;
    }

    const data = await response.json();

    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    router.refresh();

    setSuccessMessage('Image uploaded successfully');
  }

  return (
    <div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <strong className="block mb-6">{formTitle}</strong>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          userFormApiHandler(formData);
        }}
        className="flex flex-col justify-center gap-3 max-w-sm mx-auto"
      >
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            name="firstName"
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
            name="lastName"
          />
        </label>

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
          {buttonTitle}
        </button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
