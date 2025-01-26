"use client";

import { useState, useEffect, ReactNode } from "react";
import { WishListItem, WishListContextType, WishListContext } from "./WishlistContext";
import { toast } from "react-toastify";

export const WishListProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [wishListItems, setWishListItems] = useState<WishListItem[]>(() => {
    // Initialize wishlist from localStorage
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("WishListItems");
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    // Persist wishlist to localStorage whenever items change
    localStorage.setItem("WishListItems", JSON.stringify(wishListItems));
  }, [wishListItems]);

  const addToWishList = (item: WishListItem) => {
    setWishListItems((prevItems) => {
      const alreadyInWishList = prevItems.some((i) => i.id === item.id);

      if (alreadyInWishList) {
        toast.info("Item is already in the wishlist.", { autoClose: 500 });
        return prevItems;
      }

      toast.success("Item added to wishlist!", { autoClose: 500 });
      return [...prevItems, item];
    });
  };

  const removeFromWishList = (id: string) => {
    setWishListItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.info("Item removed from wishlist.", { autoClose: 500 });
  };

  const contextValue: WishListContextType = {
    items: wishListItems,
    addToWishList,
    removeFromWishList,
  };
  
  return (
    <WishListContext.Provider value={contextValue}>
      {children}
    </WishListContext.Provider>
  );
};