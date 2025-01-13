import Service from "@/components/Service";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
  return (
    <div>
      <BreadCrumb title="Cart" url="cart" />
      <div className=" flex justify-center items-center mx-auto px-4 sm:px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Table  large screens*/}
            <div className="hidden sm:block lg:col-span-2 bg-white shadow-md rounded-lg">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="text-left py-4 px-6 text-gray-600 font-medium">
                      Product
                    </th>
                    <th className="text-left py-4 px-6 text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-gray-600 font-medium">
                      Quantity
                    </th>
                    <th className="text-left py-4 px-6 text-gray-600 font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 flex items-center">
                      <Image
                        src="/Asgaardsofa4.png"
                        alt="Asgaard sofa"
                        width={64}
                        height={64}
                        className="rounded"
                      />
                      <span className="ml-4 text-gray-700">Asgaard sofa</span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">Rs. 250,000.00</td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        defaultValue={1}
                        className="w-16 border border-gray-300 rounded p-1 text-center"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-700">Rs. 250,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Product card for mobile */}
            <div className="sm:hidden bg-morelightyellow shadow-md  rounded-lg">
              <div className="flex p-5  space-y-4 flex-col xs:flex-row justify-center items-center ">
                <div className="">
                  <Image
                    src="/Asgaardsofa4.png"
                    alt="Asgaard sofa"
                    width={80}
                    height={80}
                    className="rounded bg-lightyellow"
                  />
                </div>
                <div className="space-y-2 px-5">
                  <div className="flex justify-between gap-4">
                    <p>Product:</p>
                    <p>Asgaard sofa</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p>Price:</p>
                    <p>Rs. 250,000.00</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p>Quantity:</p>
                    <p>1</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Cart Totals */}
            <div className="bg-morelightyellow shadow-md rounded-lg p-6 ">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-4 mb-4">
                Cart Totals
              </h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>
              <div className="flex justify-between text-darkyellow font-bold text-lg">
                <span>Total</span>
                <span>Rs. 250,000.00</span>
              </div>
              <Link href={"/checkout"}>
                <button className="mt-6 w-full bg-lightyellow hover:bg-darkyellow text-black py-3 px-4 rounded shadow">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Service />
    </div>
  );
}
