import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get storage stats for a wallet
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

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        files: {
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        stats: {
          totalFiles: 0,
          totalSize: 0,
          encryptedFiles: 0,
          recentUploads: [],
        },
      });
    }

    const totalFiles = user.files.length;
    const totalSize = user.files.reduce((acc, f) => acc + Number(f.size), 0);
    const encryptedFiles = user.files.filter((f) => f.encrypted).length;
    const recentUploads = user.files.slice(0, 5).map((f) => ({
      ...f,
      size: Number(f.size),
    }));

    return NextResponse.json({
      stats: {
        totalFiles,
        totalSize,
        encryptedFiles,
        recentUploads,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
