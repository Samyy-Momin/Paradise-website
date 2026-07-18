import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth`
      : process.env.BACKEND_API_URL
        ? `${process.env.BACKEND_API_URL}/auth`
        : "http://localhost:4000/api/auth",
  plugins: [adminClient()],
});
