"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDropdown() {
  const { items, updateQty, removeFromCart } = useCart();

  // Calculate the subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-2 mr-5 shadow-lg rounded-lg w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button className="text-lg font-bold">&times;</button>
      </div>

      {/* Cart Items */}
      <div className="py-4 max-h-80 overflow-y-auto">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4 mb-4">
              {/* Product Image */}
              <div className="relative h-20 w-20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded bg-lightyellow"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between pr-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-darkyellow">Rs. {item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500"
                  >
                    &times;
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="h-6 w-6 border"
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    className="h-6 w-6 border"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Total */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="text-darkyellow">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="grid gap-2">
          <Link
            href="/cart"
            className="block border text-center px-4 py-2 text-sm bg-lightyellow"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            className="block border text-center px-4 py-2 text-sm bg-darkyellow text-white"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
