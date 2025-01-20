/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
// @ts-nocheck

import BreadCrumb from "@/components/BreadCrumb";
import Service from "@/components/Service";
import Card from "@/components/Card";
import Link from "next/link";
import Filter from "@/components/Filter";
import { getAllProducts } from "@/sanity/queries/FetchProduct";
import { CardData } from "@/utils/types";

export default async function Shop() {
  const data: CardData[] = await getAllProducts(); // Add type here for data
  console.log(data);
  
  return (
    <div>
      <BreadCrumb title="Shop" url="shop" />
      
      <Filter />
      <div className="flex justify-center items-center mx-auto px-4 sm:px-6 md:px-16">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {data.map((cardData) => (
              <div key={cardData._id}>
                 <Card {...cardData} />
              
              </div>
            ))}
          </div>
        </div>
      </div>
      <Service />
    </div>
  );
}
