"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Failed to sign in. Please check your credentials.");
        return;
      }

      // Successful login
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) { if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Paradise English School Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-center text-3xl font-heading font-bold tracking-tight text-slate-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to manage your school's website
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                Email address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="admin@school.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-school-blue hover:bg-school-blue/90 text-white font-bold h-12"
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Sign in
            </Button>
          </div>
        </form>
      </div>
      
      {/* Decorative background blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-school-blue/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-school-yellow/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
    </div>
  );
}
