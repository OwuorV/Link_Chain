// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Call getSession without arguments - it will use cookies() internally
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true, password: true },
    });

    const body = await request.json();
    const { productId, quantity, productName, productPrice, productImage } =
      body;

    // Validation
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Product ID and valid quantity are required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if item is already in cart
    const existingCartItem = await db.cart.findFirst({
      where: {
        userId: session.userId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      // Update quantity if item already exists
      const updatedCartItem = await db.cart.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: "Cart updated successfully",
        cartItem: updatedCartItem,
      });
    } else {
      // Create new cart item
      const cartItem = await db.cart.create({
        data: {
          userId: session.userId,
          productId: productId,
          quantity: quantity,
          productName: productName || product.name,
          productPrice: productPrice || product.price,
          productImage: productImage || product.imageUrl,
        },
      });

      return NextResponse.json({
        message: "Added to cart successfully",
        cartItem,
      });
    }
  } catch (error) {
    console.error("Cart API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Consistent - no arguments needed
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const cartItems = await db.cart.findMany({
      where: { userId: session.userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error("Get Cart API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Consistent - no arguments needed
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get("id");

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    // Verify the cart item belongs to the user
    const cartItem = await db.cart.findFirst({
      where: {
        id: cartItemId,
        userId: session.userId,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await db.cart.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Delete Cart API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
