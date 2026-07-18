import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dghemsxka",
  api_key: "974718497549977",
  api_secret: "Edu4qA8ry1OE1A6RVB6-7Xi_-JU",
});

export async function POST(req: NextRequest) {
  try {
    // Basic auth check
    const token = req.cookies.get("better-auth.session_token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "paradise_school" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      message: "Success",
      url: (uploadResult as any).secure_url,
    });
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to upload to Cloudinary" },
      { status: 500 },
    );
  }
}
