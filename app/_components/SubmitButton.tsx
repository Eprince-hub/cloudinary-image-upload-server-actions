'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  buttonTitle: string;
  buttonStyle?: string;
  disabled?: boolean;
  formAction?: (
    formData: FormData,
  ) => Promise<{ error: string } | undefined> | void;
};

export function SubmitButton({
  buttonTitle,
  buttonStyle,
  formAction,
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      formAction={formAction}
      disabled={disabled || pending}
      className={`flex justify-center items-center text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700 ${buttonStyle} ${disabled ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700'}`}
    >
      {pending ? 'submitting...' : buttonTitle}
    </button>
  );
}
