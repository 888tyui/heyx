import { NextRequest, NextResponse } from "next/server";

// This API route is for future database integration
// Currently, share links are stored in localStorage on the client

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shareId = searchParams.get("id");

  if (!shareId) {
    return NextResponse.json(
      { error: "Share ID required" },
      { status: 400 }
    );
  }

  // In MVP, share links are in localStorage
  // Future: Query database for share link
  return NextResponse.json({
    share: null,
    message: "Use localStorage for MVP. Share link not found in server.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fileId, owner, expiresAt, maxAccess, password } = body;

    if (!fileId || !owner) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate share link
    const shareId = crypto.randomUUID();

    // In MVP, save to localStorage on client
    // Future: Save to database
    return NextResponse.json({
      success: true,
      share: {
        id: shareId,
        fileId,
        owner,
        expiresAt,
        maxAccess,
        hasPassword: !!password,
        accessCount: 0,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shareId = searchParams.get("id");

  if (!shareId) {
    return NextResponse.json(
      { error: "Share ID required" },
      { status: 400 }
    );
  }

  // In MVP, deletion happens in localStorage
  // Future: Delete from database
  return NextResponse.json({
    success: true,
    message: "Share link deletion should be handled in localStorage for MVP",
  });
}
