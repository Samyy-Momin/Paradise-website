import axios from "axios";

// Automatically determine the base URL depending on the environment
const baseURL =
  typeof window !== "undefined"
    ? "/api" // On the client side, proxy through Next.js
    : process.env.BACKEND_API_URL || "http://localhost:4000/api"; // On the server side, go directly to backend

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // Always send cookies (better-auth session)
});

// Optionally add interceptors here later if we need to catch 401s and force logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global 401 errors by redirecting to login
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Avoid infinite redirects if already on login page
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = "/admin/login?error=unauthorized";
      }
    }
    return Promise.reject(error);
  }
);
