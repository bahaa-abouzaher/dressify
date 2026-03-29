"use client"

import Link from "next/link";
import { useState } from "react";
import { calcCartPrices } from "./calcCartPrices";
import { useCart } from "./CartContext";
import { useSubmit } from "./SubmitContext";


function CartFinalPrice({ location }) {
  const {cart} = useCart();
  
  const submit = useSubmit();
  const loading = submit?.loading || false;

  const { total, freeDelivery, finalPrice } = calcCartPrices(cart);

  if(!cart.length) return;

  return (
    <div className="flex flex-col gap-3 px-2 py-4 md2:mt-10 md2:ml-5 bg-(--gray-bg) w-fit h-fit rounded-xl mx-auto min-w-60">
      <div className="md:text-base md2:text-sm flex flex-col gap-1 mt-4 ">
        <span>Subtotal ({cart.length} items): <strong>${total}</strong></span>
        <span className="text-xs italic">{freeDelivery ? "Eligible for free Delivery" : "Delivery fee $3.5"}</span>
        <span>Final Price: <strong>${finalPrice}</strong></span>
      </div>

      {location === "cart" ? ( 
        <Link href="/checkout" className="flex justify-center h-fit mt-2">
          <button 
            className="h-fit max-w-40 w-full text-[13px] font-semibold bg-(--orange-main) hover:bg-(--orange-secondary) rounded-2xl py-1 px-3 cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </Link>
      ) : ""}

        {location === "checkout" ? (
          <div className="flex justify-center h-fit mt-2">
            <button 
              type="submit"
              form="checkout-form"
              disabled={loading}
              className={`h-fit max-w-40 w-full text-[13px] font-semibold rounded-2xl py-1 px-3 
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-(--orange-main) hover:bg-(--orange-secondary) cursor-pointer"
                }`}
            >
              {loading ? "Processing..." : "Buy now"}
            </button>
          </div>
        ) : ""}
    </div>
 
  )
}

export default CartFinalPrice
