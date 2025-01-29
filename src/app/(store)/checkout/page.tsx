"use client";
import Service from "@/components/Service";
import BreadCrumb from "@/components/BreadCrumb";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
};
export default function CheckOut() {
  const { items } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => price.toFixed(2);
  return (
    <div>
      <BreadCrumb title="Checkout" url="checkout" />
      <div className="flex justify-center items-center mx-auto px-4 sm:px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Billing details
            </h2>
            <form
              className="grid grid-cols-2 gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 3,
                    message: "First Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "First Name cannot be longer than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "First Name must only contain letters",
                  },
                })}
                className="col-span-1 border border-gray-300 rounded p-5"
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                  minLength: {
                    value: 3,
                    message: "Last Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last Name cannot be longer than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last Name must only contain letters",
                  },
                })}
                className="col-span-1 border border-gray-300 rounded p-5"
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}

              {/* Company Name */}
              <input
                type="text"
                placeholder="Company Name (Optional)"
                {...register("companyName", {
                  maxLength: {
                    value: 100,
                    message:
                      "Company Name cannot be longer than 100 characters",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />

              {/* Country */}
              <select
                {...register("country", { required: "Country is required" })}
                className="col-span-2 border border-gray-300 rounded p-5"
              >
                <option value="">Country / Region</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}

              {/* Street Address */}
              <input
                type="text"
                placeholder="Street Address"
                {...register("streetAddress", {
                  required: "Street Address is required",
                  minLength: {
                    value: 5,
                    message: "Street Address must be at least 5 characters",
                  },
                  maxLength: {
                    value: 150,
                    message:
                      "Street Address cannot be longer than 150 characters",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              {errors.streetAddress && (
                <span className="text-red-500">
                  {errors.streetAddress.message}
                </span>
              )}

              {/* City */}
              <input
                type="text"
                placeholder="City"
                {...register("city", { required: "City is required" })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}

              {/* ZIP Code */}
              <input
                type="text"
                placeholder="ZIP Code"
                {...register("zipCode", {
                  required: "ZIP Code is required",
                  pattern: {
                    value: /^[0-9]{5,6}$/,
                    message: "Invalid ZIP Code format",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              {errors.zipCode && (
                <span className="text-red-500">{errors.zipCode.message}</span>
              )}

              {/* Phone */}
              <input
                type="text"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be a 10-digit number",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              {/* Additional Information */}
              <textarea
                placeholder="Additional Information"
                {...register("additionalInfo", {
                  maxLength: {
                    value: 500,
                    message:
                      "Additional Information cannot exceed 500 characters",
                  },
                })}
                className="col-span-2 border border-gray-300 rounded p-5 h-20"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="col-span-2 bg-lightyellow hover:bg-darkyellow text-black py-3 px-4 rounded shadow"
              >
                Place order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Product
              </h2>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Sub Total
              </h2>
            </div>

            <div className="border-b pb-4 mb-4">
              {/* Display Cart Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>$. {formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="flex justify-between text-gray-700 mt-2">
                <span>Subtotal</span>
                <span>$. {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-bold text-lg mt-2">
                <span>Total</span>
                <span className="text-darkyellow">
                  $. {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <input type="radio" name="payment" className="mr-2" /> Direct
                Bank Transfer
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
              <label className="block text-gray-700 mb-2">
                <input type="radio" name="payment" className="mr-2" /> Cash on
                Delivery
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
