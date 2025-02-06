import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const orderPayload = await req.json();

    // Extract order and billing details from payload
    const { addCart, billingDetails, paymentMethod } = orderPayload;

    if (
      !billingDetails ||
      !billingDetails.email ||
      !addCart ||
      addCart.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing order or billing details." },
        { status: 400 }
      );
    }

    // Destructure billing details (adjust property names as needed)
    const {
      fullName,
      email,
      phone,
      country,
      streetAddress,
      city,
      zipCode,
      province,
      companyName,
    } = billingDetails;

    // Create the order document in Sanity
    const orderDoc = {
      _type: "order",
      items: addCart, // transform items as needed
      paymentMethod,
      createdAt: new Date().toISOString(),
      // Optionally add total amount, status, etc.
    };

    const createdOrder = await client.create(orderDoc);

    // Check if customer exists using the email as unique identifier
    const query = `*[_type == "customer" && email == $email][0]`;
    const existingCustomer = await client.fetch(query, { email });

    if (existingCustomer) {
      // Update the customer by appending the new order reference
      await client
        .patch(existingCustomer._id)
        .setIfMissing({ orders: [] })
        .append("orders", [{ _type: "reference", _ref: createdOrder._id }])
        .commit();
    } else {
      // Create a new customer document with the order reference
      await client.create({
        _type: "customer",
        name: fullName,
        email,
        phoneNumber: phone,
        address: streetAddress,
        city,
        zipCode,
        province,
        companyName: companyName || "",
        country,
        orders: [{ _type: "reference", _ref: createdOrder._id }],
      });
    }

    // Return success response
    return NextResponse.json(
      { url: "/success", orderId: createdOrder._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json(
      { error: "Order processing failed." },
      { status: 500 }
    );
  }
}
