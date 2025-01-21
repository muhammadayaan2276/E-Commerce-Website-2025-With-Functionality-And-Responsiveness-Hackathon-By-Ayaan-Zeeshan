"use client"
import Service from "@/components/Service";
import BreadCrumb from "@/components/BreadCrumb";
import { useCart } from "@/context/CartContext"; // Import your Cart context hook

export default function CheckOut() {
  const { items } = useCart(); // Retrieve cart items from context

  // Calculate the total price
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to format price to two decimal points
  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div>
      <BreadCrumb title="Checkout" url="checkout" />
      <div className="flex justify-center items-center mx-auto px-4 sm:px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Billing details</h2>
            <form className="grid grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="First Name"
                className="col-span-1 border border-gray-300 rounded p-5"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="col-span-1 border border-gray-300 rounded p-5"
              />
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <select className="col-span-2 border border-gray-300 rounded p-5">
                <option>Country / Region</option>
                <option>Sri Lanka</option>
              </select>
              <input
                type="text"
                placeholder="Street Address"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <input
                type="text"
                placeholder="Town / City"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <select className="col-span-2 border border-gray-300 rounded p-5">
                <option>Province</option>
                <option>Western Province</option>
              </select>
              <input
                type="text"
                placeholder="ZIP Code"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <input
                type="text"
                placeholder="Phone"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              <textarea
                placeholder="Additional Information"
                className="col-span-2 border border-gray-300 rounded p-5 h-20"
              ></textarea>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Product</h2>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Sub Total</h2>
            </div>

            <div className="border-b pb-4 mb-4">
              {/* Display Cart Items */}
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs. {formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="flex justify-between text-gray-700 mt-2">
                <span>Subtotal</span>
                <span>Rs. {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-bold text-lg mt-2">
                <span>Total</span>
                <span className="text-darkyellow">Rs. {formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <input type="radio" name="payment" className="mr-2" /> Direct Bank Transfer
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
              </p>
              <label className="block text-gray-700 mb-2">
                <input type="radio" name="payment" className="mr-2" /> Cash on Delivery
              </label>
            </div>

            <button className="w-full bg-lightyellow hover:bg-darkyellow text-black py-3 px-4 rounded shadow">
              Place order
            </button>
          </div>
        </div>
      </div>
      <Service />
    </div>
  );
}
