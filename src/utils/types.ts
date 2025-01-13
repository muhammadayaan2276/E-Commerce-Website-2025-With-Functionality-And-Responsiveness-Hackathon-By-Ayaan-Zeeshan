interface SecData {
    image: string;
    title: string;
    price: number;
}
// utils/secData.ts
 interface Product {
    _id: string;
    // _type: string;
    imageUrl:string
    sizes: string[];
    description: string;
    name: string;
    price: number;
    tags: string[];
    rating: number;
}

interface CardData {
    _id: string;
    imageUrl:string;
    name: string;
    price: number;
    rating: number;
}
  
  

export type {SecData, Product, CardData}