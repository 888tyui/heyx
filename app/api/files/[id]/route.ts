import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get a single file by ID
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

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        user: { walletAddress },
      },
      include: {
        shareLinks: true,
      },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      file: {
        ...file,
        size: Number(file.size),
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a file
export async function DELETE(
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

    // Verify ownership before deleting
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

    // Delete file (cascade will delete share links)
    await prisma.file.delete({
      where: { id: fileId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
