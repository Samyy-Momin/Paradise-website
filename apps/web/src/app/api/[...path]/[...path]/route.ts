import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:4000/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const url = new URL(request.url);
  const targetUrl = `${BACKEND_URL}/auth/${pathStr}${url.search}`;

  const headers = new Headers();

  // Forward all necessary headers for Better Auth to work behind a proxy
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
  headers.set("content-type", "application/json");

  const res = await fetch(targetUrl, {
    method: "GET",
    headers,
  });

  const body = await res.text();
  const response = new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });

  // Forward ALL Set-Cookie headers from backend to browser
  const setCookies = res.headers.getSetCookie();
  for (const cookie of setCookies) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const url = new URL(request.url);
  const targetUrl = `${BACKEND_URL}/auth/${pathStr}${url.search}`;

  const headers = new Headers();

  // Forward all necessary headers for Better Auth to work behind a proxy
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
  headers.set("content-type", "application/json");

  let body: string | undefined;
  try {
    body = await request.text();
  } catch {
    // no body
  }

  const res = await fetch(targetUrl, {
    method: "POST",
    headers,
    body: body || undefined,
  });

  const responseBody = await res.text();
  const response = new NextResponse(responseBody, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });

  // Forward ALL Set-Cookie headers from backend to browser
  const setCookies = res.headers.getSetCookie();
  for (const cookie of setCookies) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}
