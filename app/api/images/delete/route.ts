import { getImageKey } from "@/lib/helpers/get-image-key";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/actions/images/images.actions";

export const POST = async (req: Request) => {
  try {
    const { url } = (await req.json()) as { url?: string };
    if (!url)
      return NextResponse.json({ ok: false, error: "No URL" }, { status: 400 });

    const key = getImageKey(url);
    if (!key) {
      console.log("No key found");
      return NextResponse.json(
        { ok: false, error: "Invalid URL" },
        { status: 400 }
      );
    }

    console.log("Calling delete image");
    await deleteImage(url);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("UploadThing delete failed:", err);
    return NextResponse.json(
      { ok: false, error: "Delete failed" },
      { status: 500 }
    );
  }
};
