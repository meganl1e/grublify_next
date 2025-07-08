import { DeleteItemButton } from "./delete-item-button"
import { EditItemQuantityButton } from "./edit-item-quantity-button";
// import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { CartLineQuantity, useCartLine, CartLineQuantityAdjustButton, useCart } from "@shopify/hydrogen-react";
import { HiXMark } from "react-icons/hi2";
import { CiTrash } from "react-icons/ci";


export default function CartLine({ closeCart }) {

  const line = useCartLine();
  // console.log("cart line: ", line)

  const { linesRemove } = useCart();




  return (

    <li
      key={line.id}
      className="flex w-full flex-col border-b border-neutral-300"
    >
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="flex flex-row gap-2">
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              className="h-full w-full object-cover"
              width={64}
              height={64}
              alt={
                line.merchandise.image.altText ||
                line.merchandise.product.title
              }
              src={
                line.merchandise.image.url
              }
            />
          </div>

          <div className="flex flex-col gap-2">

          
          <Link
            href={`/products/${line.merchandise.product.handle}`}
            onClick={closeCart}
            className="z-30 ml-2 flex flex-row space-x-4"
          >
            <div className="flex flex-1 flex-col text-base">
              <span className="leading-tight">
                {line.merchandise.product.title}
              </span>
              {line.merchandise.title !==
                "placeholder" ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {line.merchandise.title}
                </p>
              ) : null}


              
            </div>
          </Link>

          {/* quantity selector */}
              <div className="mr-auto flex h-9 flex-row items-center rounded-full border border-neutral-300">
                {/* decrease quantity  */}
                <CartLineQuantityAdjustButton adjust="decrease">
                  <EditItemQuantityButton type="minus" />
                </CartLineQuantityAdjustButton>

                {/* current quantity */}
                <p className="w-6 text-center">
                  <CartLineQuantity className="text-secondary" />
                </p>

                {/* increase quantity */}
                <CartLineQuantityAdjustButton adjust="increase">
                  <EditItemQuantityButton type="plus" />
                </CartLineQuantityAdjustButton>
              </div>

          </div>


        </div>

        <div className="flex flex-col justify-between">

          {/* price */}
          <div
            className="flex justify-end space-y-2 text-right text-md font-semibold"
          >
             ${parseFloat(line.cost.totalAmount.amount).toFixed(2)} {line.cost.totalAmount.currencyCode}
          </div>

          {/* remove item */}
          <button
            className="flex justify-end text-right text-red-500 cursor-pointer"
            onClick={() => linesRemove([line.id])}
          >
            <CiTrash className="w-6 h-6" />
          </button>
        </div>

      </div>
    </li>

  )
}


{/* quantity selector */ }
{/* <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-700"> */ }
{/* decrease quantity  */ }
{/* <CartLineQuantityAdjustButton adjust="decrease">
              <EditItemQuantityButton type="minus" />
            </CartLineQuantityAdjustButton> */}

{/* current quantity */ }
{/* <p className="w-6 text-center">
              <CartLineQuantity className="text-secondary" />
            </p> */}

{/* increase quantity */ }
{/* <CartLineQuantityAdjustButton adjust="increase">
              <EditItemQuantityButton type="plus" />
            </CartLineQuantityAdjustButton>
          </div> */}