'use client';

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import clsx from 'clsx';


// type can be 'plus' or 'minus'
function SubmitButton({ type }) {
  return (
    <div
      type="submit"
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <FaPlus className="h-4 w-4 text-secondary" />
      ) : (
        <FaMinus className="h-4 w-4 text-secondary" />
      )}
    </div>
  );
}

export function EditItemQuantityButton({ type }) {
  return (
    <div className="cursor-pointer">
      <SubmitButton type={type} />
      {/* <SubmitButton type="plus" /> */}
      <p aria-live="polite" className="sr-only" role="status">
        placeholder
      </p>
    </div>
  );
}
