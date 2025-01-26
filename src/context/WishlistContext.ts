import { createContext } from "react";

export interface WishListItem {
  id: string;
  name: string;
  // other properties...
}

export interface WishListContextType {
  items: WishListItem[];
  addToWishList: (item: WishListItem) => void;
  removeFromWishList: (id: string) => void;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export default WishListContext;