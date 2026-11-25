import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      userId,
      customerName,
      contactNumber,
      orderType,
      systemSizeKw,
      totalAmount,
      status,
    } = body;

    if (!customerName || !contactNumber || !orderType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: customerName, contactNumber, or orderType.",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const generatedOrderId =
      orderId || `SOL-${Date.now().toString().slice(-6)}`;

    const newOrder = await Order.create({
      orderId: generatedOrderId,
      userId: userId || contactNumber || "guest",
      customerName: customerName.trim(),
      contactNumber: contactNumber.trim(),
      orderType: orderType.trim(),
      systemSizeKw: typeof systemSizeKw === "number" ? systemSizeKw : 0,
      totalAmount: typeof totalAmount === "number" ? totalAmount : 0,
      status: status || "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully in database.",
        order: newOrder,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process order.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const contactNumber = searchParams.get("contactNumber");

    await connectToDatabase();

    const query: Record<string, string> = {};
    if (userId) query.userId = userId;
    if (contactNumber) query.contactNumber = contactNumber;

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        count: orders.length,
        orders,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    const message =
      error instanceof Error ? error.message : "Failed to retrieve orders.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
