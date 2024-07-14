'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../Components/SubmitButton';
import ErrorMessage from '../ErrorMessage';
import { createUser } from './action';

export default function UserFormAction({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formData, setFormData] = useState<FormData>();
  const [successMessage, setSuccessMessage] = useState('');

  const [state, formAction] = useFormState(
    createUser.bind(null, { firstName, lastName, formData }),
    null,
  );

  const router = useRouter();

  useEffect(() => {
    if (state && 'user' in state) {
      setSuccessMessage('User created successfully');
      router.refresh();
    }
  }, [state?.user]);

  return (
    <div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <strong className="block mb-6">{formTitle}</strong>
      <form className="flex flex-col justify-center gap-3 max-w-sm mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            name="firstName"
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
            name="lastName"
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <label>
          Select Image:
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              const newFormData = new FormData();

              if (file) {
                newFormData.append('image', file);
              }

              setFormData(newFormData);
            }}
          />
        </label>
        <SubmitButton formAction={formAction} buttonTitle={buttonTitle} />
      </form>
      {state && 'error' in state && state.error ? (
        <ErrorMessage>{state.error}</ErrorMessage>
      ) : null}
    </div>
  );
}
