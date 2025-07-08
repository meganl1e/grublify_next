'use client';

import { HiXMark } from "react-icons/hi2";
// import { removeItem } from 'components/cart/actions';
// import type { CartItem } from 'lib/shopify/types';
// import { useActionState } from 'react';

export function DeleteItemButton() {
//   item,
//   optimisticUpdate
// }: {
//   item: CartItem;
//   optimisticUpdate: any;
// }) {
//   const [message, formAction] = useActionState(removeItem, null);
//   const merchandiseId = item.merchandise.id;
//   const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-300"
      >
        <HiXMark className="mx-[1px] h-4 w-4 text-secondary" />
      </button>
    </form>
  );
}
