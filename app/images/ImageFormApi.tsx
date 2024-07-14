'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitButton } from '../Components/SubmitButton';
import ErrorMessage from '../ErrorMessage';

export default function ImageFormApi({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  async function imageFormApiHandler(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('images/api/upload', {
      method: 'POST',
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
        onSubmit={imageFormApiHandler}
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
        <SubmitButton buttonTitle={buttonTitle} />
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
