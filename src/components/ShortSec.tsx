import Card from "@/components/Card";

import { CardData } from "@/utils/types";


export interface Sectiondata {
    title:string,
    description?:string,
    cardData:any[],

}

export default  function ShortSec(data:Sectiondata) {
 

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-16 lg:px-32 flex justify-center items-center">
      <div className="space-y-8  flex flex-col justify-center items-center py-8">
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        {data.description && <p className="text-sm text-gray-600">{data.description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {data.cardData.map((cardData: any, index:number) => (
          
            <Card key={index} {...cardData} />
          
          ))}
        </div>
        <div>
            <span className="text-xl text-black border-b-2 font-semibold  border-black">View More</span>
        </div>
      </div>
    </div>
  );
}



 