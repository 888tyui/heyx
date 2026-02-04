import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get share link by access key (public endpoint for accessing shared files)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accessKey = searchParams.get("key");

    if (!accessKey) {
      return NextResponse.json(
        { error: "Access key required" },
        { status: 400 }
      );
    }

    const shareLink = await prisma.shareLink.findUnique({
      where: { accessKey },
      include: {
        file: true,
      },
    });

    if (!shareLink) {
      return NextResponse.json(
        { error: "Share link not found" },
        { status: 404 }
      );
    }

    // Check if expired
    if (shareLink.expiresAt && new Date() > shareLink.expiresAt) {
      return NextResponse.json(
        { error: "Share link has expired" },
        { status: 410 }
      );
    }

    // Check if max downloads reached
    if (shareLink.maxDownloads && shareLink.downloadCount >= shareLink.maxDownloads) {
      return NextResponse.json(
        { error: "Share link has reached maximum downloads" },
        { status: 410 }
      );
    }

    // Increment download count
    await prisma.shareLink.update({
      where: { id: shareLink.id },
      data: { downloadCount: { increment: 1 } },
    });

    return NextResponse.json({
      share: {
        ...shareLink,
        file: {
          ...shareLink.file,
          size: Number(shareLink.file.size),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching share link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new share link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, walletAddress, expiresAt, maxDownloads, password } = body;

    if (!fileId || !walletAddress) {
      return NextResponse.json(
        { error: "Missing required fields: fileId, walletAddress" },
        { status: 400 }
      );
    }

    // Verify file ownership
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        user: { walletAddress },
      },
      include: { user: true },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found or unauthorized" },
        { status: 404 }
      );
    }

    // Create share link
    const shareLink = await prisma.shareLink.create({
      data: {
        fileId,
        createdById: file.user.id,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        maxDownloads: maxDownloads || null,
        passwordHash: password || null, // TODO: Hash password properly
      },
    });

    return NextResponse.json({
      success: true,
      share: shareLink,
    });
  } catch (error) {
    console.error("Error creating share link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
