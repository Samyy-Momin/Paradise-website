"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Loader2,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
}

export function FileUploadField({
  value,
  onChange,
  label,
  description,
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "link">("upload");
  const [tempLink, setTempLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError("File must be less than 50MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      if (err?.digest === "DYNAMIC_SERVER_USAGE") throw err;
      setError(err.message || "An error occurred during upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddLink = () => {
    if (!tempLink.trim()) return;
    onChange(tempLink.trim());
    setTempLink("");
  };

  const clearImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      {description && (
        <p className="text-[0.8rem] text-slate-500">{description}</p>
      )}

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="mt-2">
        {value ? (
          <div className="relative inline-block border rounded-lg overflow-hidden bg-slate-50">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center bg-slate-100">
              {value.match(/\.(mp4|webm)(\?.*)?$/i) ? (
                <video
                  src={value}
                  className="w-full h-full object-cover"
                  controls
                  muted
                />
              ) : value.match(/\.(pdf)(\?.*)?$/i) ? (
                <iframe
                  src={`${value}#toolbar=0`}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              ) : value.match(/\.(doc|docx)(\?.*)?$/i) ? (
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-xl">DOC</span>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">
                    Document File
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x400?text=Invalid+File+URL";
                  }}
                />
              )}
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b bg-slate-50">
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium flex items-center justify-center transition-colors ${
                  mode === "upload"
                    ? "bg-white border-b-2 border-school-blue text-school-blue"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setMode("upload")}
              >
                <Upload className="w-4 h-4 mr-2" /> Upload Image
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium flex items-center justify-center transition-colors ${
                  mode === "link"
                    ? "bg-white border-b-2 border-school-blue text-school-blue"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setMode("link")}
              >
                <LinkIcon className="w-4 h-4 mr-2" /> Web Link
              </button>
            </div>

            <div className="p-4">
              {mode === "upload" ? (
                <div
                  className={`border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />

                  {isUploading ? (
                    <>
                      <Loader2 className="h-8 w-8 text-school-blue animate-spin mb-3" />
                      <p className="text-sm font-medium text-slate-700">
                        Uploading...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <Upload className="h-5 w-5 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        Select File
                      </p>
                    </>
                  )}
                  <p className="mt-2 text-xs text-slate-500">
                    Images, Videos, PDFs, and Word docs supported.
                  </p>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="https://example.com/file.pdf"
                    value={tempLink}
                    onChange={(e) => setTempLink(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLink();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddLink}
                    disabled={!tempLink.trim()}
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
