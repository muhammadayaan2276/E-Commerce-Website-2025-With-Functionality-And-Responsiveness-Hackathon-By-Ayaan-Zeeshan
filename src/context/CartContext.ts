"use client"
import {createContext,useContext} from "react"

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stockLevel: number
}

export interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQty: (id: string, quantity: number) => void;
  }

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };