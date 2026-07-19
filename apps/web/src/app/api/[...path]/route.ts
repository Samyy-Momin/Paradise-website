import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:4000/api";

async function proxyRequest(request: NextRequest, path: string[]) {
  const pathStr = path.join("/");
  const url = new URL(request.url);
  // BACKEND_URL already includes /api, so we just append the path
  const targetUrl = `${BACKEND_URL}/${pathStr}${url.search}`;

  const headers = new Headers();

  // Forward all necessary headers
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const auth = request.headers.get("authorization");
  if (auth) headers.set("authorization", auth);

  const origin = request.headers.get("origin");
  if (origin) headers.set("origin", origin);

  const host = request.headers.get("host");
  if (host) {
    headers.set("host", host);
    headers.set("x-forwarded-host", host);
  }

  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers.set("user-agent", userAgent);

  const ip = request.headers.get("x-forwarded-for");
  if (ip) headers.set("x-forwarded-for", ip);

  headers.set("x-forwarded-proto", "https");

  // Keep original content type if present
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  let body: any = undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = request.body;
  }

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
  });

  // Read response as array buffer to support binary files/images
  const responseBody = await res.arrayBuffer();
  
  const responseHeaders = new Headers();
  responseHeaders.set("content-type", res.headers.get("content-type") || "application/json");
  
  // Forward ALL Set-Cookie headers from backend to browser
  const setCookies = res.headers.getSetCookie();
  for (const cookie of setCookies) {
    responseHeaders.append("set-cookie", cookie);
  }

  return new NextResponse(responseBody, {
    status: res.status,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}
