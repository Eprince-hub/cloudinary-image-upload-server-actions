'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorMessage from './_components/ErrorMessage';
import { SubmitButton } from './_components/SubmitButton';
import { ImageFormActionProps, uploadImage } from './actions';

const initialState: ImageFormActionProps = {
  type: 'initial',
};

export default function ImageFormAction({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [state, formAction] = useFormState(uploadImage, initialState);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state.type !== 'success') {
      return;
    }

    // TODO: Implement the API endpoint
    const response = await fetch('/api/<API Endpoint>', {
      method: 'POST',
      body: JSON.stringify({
        imageId: state.imageId,
        // Other state variables
      }),
    });

    if (!response.ok) {
      const errorData: {
        error: string;
      } = await response.json();
      setErrorMessage(errorData.error);
      return;
    }

    const data: {
      error?: string;
    } = await response.json();

    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    setSuccessMessage('Success');
    router.refresh();
  }

  return (
    <div>
      {!!successMessage && <p className="text-green-600">{successMessage}</p>}
      <strong className="block mb-6">{formTitle}</strong>
      {/* You can add other state variables */}
      {/*
      <input />
      <input />
      */}

      <form className="flex justify-center items-center gap-1 max-w-sm">
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          name="image"
          accept="image/*"
        />

        <SubmitButton
          buttonStyle="h-7"
          buttonTitle={buttonTitle}
          formAction={formAction}
        />
      </form>

      <form
        // API call with other state variables and imageId
        onSubmit={handleSubmit}
      >
        <SubmitButton
          buttonTitle="Submit"
          buttonStyle="w-full my-4"
          disabled={state.type !== 'success'}
        />
      </form>
      {state && 'error' in state && state.error ? (
        <ErrorMessage>{errorMessage ? errorMessage : state.error}</ErrorMessage>
      ) : null}
    </div>
  );
}
