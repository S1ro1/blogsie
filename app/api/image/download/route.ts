import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("No URL provided", { status: 400 });
  }
  url = "https://8qkmesip3yauldyl.public.blob.vercel-storage.com/" + url;

  const res = await fetch(new URL(url).href);
  const blob = await res.blob();
  const headers = new Headers();
  headers.set("Content-Type", "image/*");
  const response = new NextResponse(blob, {
    status: 200,
    statusText: "OK",
    headers,
  });
  return response;
}
