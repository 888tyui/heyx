import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all files for a wallet
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("wallet");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        files: {
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ files: [] });
    }

    // Convert BigInt to number for JSON serialization
    const files = user.files.map((file) => ({
      ...file,
      size: Number(file.size),
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new file record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      size,
      mimeType,
      arweaveTxId,
      irysReceiptId,
      encrypted,
      encryptionKey,
      encryptionIv,
      walletAddress,
    } = body;

    if (!name || !arweaveTxId || !walletAddress) {
      return NextResponse.json(
        { error: "Missing required fields: name, arweaveTxId, walletAddress" },
        { status: 400 }
      );
    }

    // Find or create user
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });

    // Create file record
    const file = await prisma.file.create({
      data: {
        name,
        size: BigInt(size || 0),
        mimeType: mimeType || "application/octet-stream",
        arweaveTxId,
        irysReceiptId,
        encrypted: encrypted || false,
        encryptionKey: encryptionKey || null,
        encryptionIv: encryptionIv || null,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      file: {
        ...file,
        size: Number(file.size),
      },
    });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
