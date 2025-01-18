"use client"
import { useState } from "react"
import { CartContext, CartItem, CartContextType } from "./CartContext"


export const CartProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const [items,setItems] = useState<CartItem[]>([])
    
  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQty = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };


    const contextValue:CartContextType = {
        items,
        addToCart,
        clearCart,
        removeFromCart,
        updateQty,
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}