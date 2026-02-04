import { NextRequest, NextResponse } from "next/server";

// This API route is for future database integration
// Currently, file metadata is stored in localStorage on the client

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Wallet address required" },
      { status: 400 }
    );
  }

  // In MVP, return empty array as data is in localStorage
  // Future: Query database for files owned by wallet
  return NextResponse.json({ files: [], message: "Use localStorage for MVP" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, size, type, arweaveId, owner, encrypted } = body;

    if (!name || !arweaveId || !owner) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In MVP, file metadata is stored in localStorage
    // Future: Save to database
    return NextResponse.json({
      success: true,
      message: "File metadata received. Store in localStorage for MVP.",
      file: {
        id: crypto.randomUUID(),
        name,
        size,
        type,
        arweaveId,
        owner,
        encrypted,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
