
"use client";

import { useEffect } from "react";
import { syncCartAfterSignIn } from "@/app/_lib/actions";
import { useCart } from "./CartContext";

function SyncGuest({ userId }) {
  const { cart, setCart, syncComplete } = useCart();

  useEffect(() => {
    if (!userId) {
      syncComplete.current = false; // reset after logout / no user
      return;
    }

    if (syncComplete.current) return;
    syncComplete.current = true;

    async function syncOrLoad() {
      const mergedCart = await syncCartAfterSignIn(cart);

      if (mergedCart) {
        setCart(mergedCart);
      }
    }

    syncOrLoad();
  }, [userId, cart, setCart, syncComplete]);

  return null;
}

export default SyncGuest;