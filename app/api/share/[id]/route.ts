import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get shares for a specific file
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("wallet");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    // Verify file ownership
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        user: { walletAddress },
      },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found or unauthorized" },
        { status: 404 }
      );
    }

    const shares = await prisma.shareLink.findMany({
      where: { fileId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ shares });
  } catch (error) {
    console.error("Error fetching shares:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a share link
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shareId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("wallet");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const shareLink = await prisma.shareLink.findFirst({
      where: {
        id: shareId,
        createdBy: { walletAddress },
      },
    });

    if (!shareLink) {
      return NextResponse.json(
        { error: "Share link not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.shareLink.delete({
      where: { id: shareId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting share link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
