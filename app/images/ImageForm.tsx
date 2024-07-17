'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorMessage from '../_components/ErrorMessage';
import { SubmitButton } from '../_components/SubmitButton';
import { uploadImage } from './action';

type ImageFormActionProps = { imageId: number } | { error: string } | null;

export default function ImageFormAction({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageId, setImageId] = useState<number>();
  const [fileData, setFileData] = useState<Blob>();

  const router = useRouter();

  const [state, formAction] = useFormState(
    (arg: ImageFormActionProps, formData: FormData) => uploadImage(formData),
    null,
  );

  async function handleSubmit(id: number) {
    // TODO: Implement the API endpoint

    const response = await fetch('/api/<API Endpoint>', {
      method: 'POST',
      body: JSON.stringify({
        imageId: id,
        // Other state variables
      }),
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

    setSuccessMessage('Success');
    setImageId(undefined);
    router.refresh();
  }

  useEffect(() => {
    if (state?.imageId) {
      setImageId(state.imageId);
    }
  }, [state]);

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
          onChange={(event) => {
            if (event.target.files) {
              setFileData(event.currentTarget.files?.[0]);
            }
          }}
        />

        <SubmitButton
          buttonStyle="h-7"
          buttonTitle={buttonTitle}
          formAction={() => {
            const formData = new FormData();
            if (fileData) {
              formData.append('image', fileData);
            }

            formAction(formData);
          }}
        />
      </form>

      <form
        // API call with other state variables and imageId
        onSubmit={async (event) => {
          event.preventDefault();
          if (!imageId) {
            return;
          }

          await handleSubmit(imageId);
        }}
      >
        <SubmitButton
          buttonTitle="Submit"
          buttonStyle="w-full my-4"
          disabled={!imageId}
        />
      </form>
      {state && 'error' in state && state.error ? (
        <ErrorMessage>{errorMessage ? errorMessage : state.error}</ErrorMessage>
      ) : null}
    </div>
  );
}
