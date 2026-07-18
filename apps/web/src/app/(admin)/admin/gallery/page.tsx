"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  Upload,
  Link as LinkIcon,
  X,
  FileImage,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

export default function GalleryAdminPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Bulk Upload State
  const [categoryId, setCategoryId] = useState("");
  const [altText, setAltText] = useState("");
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>([""]); // Array of URL strings
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMode, setUploadMode] = useState<"upload" | "link">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: items = [], isLoading: itemsLoading } = useQuery<any[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await apiClient.get("/gallery");
      return res.data || [];
    },
  });

  const { data: categories = [], isLoading: catsLoading } = useQuery<any[]>({
    queryKey: ["galleryCategories"],
    queryFn: async () => {
      const res = await apiClient.get("/gallery-categories");
      return res.data || [];
    },
  });

  const loading = itemsLoading || catsLoading;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    },
    onError: (err) => {
      console.error(err);
      alert("Error deleting gallery item");
    },
  });

  const openCreate = () => {
    setCategoryId(categories.length > 0 ? categories[0].id : "");
    setAltText("");
    setFilesToUpload([]);
    setExternalLinks([""]);
    setUploadMode("upload");
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  const addExternalLink = () => {
    setExternalLinks((prev) => [...prev, ""]);
  };

  const updateExternalLink = (index: number, value: string) => {
    setExternalLinks((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const removeExternalLink = (index: number) => {
    setExternalLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFileToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const createGalleryItem = async (url: string) => {
    await apiClient.post("/gallery", { url, categoryId, altText });
  };

  const onSubmitBulk = async () => {
    if (!categoryId) return alert("Please select a category.");
    if (!altText) return alert("Please provide an Alt Text.");

    setIsSubmitting(true);
    try {
      if (uploadMode === "upload") {
        if (filesToUpload.length === 0) throw new Error("No files selected.");
        for (const file of filesToUpload) {
          const url = await uploadFileToCloudinary(file);
          await createGalleryItem(url);
        }
      } else {
        const validLinks = externalLinks.filter((link) => link.trim() !== "");
        if (validLinks.length === 0) throw new Error("No links provided.");
        for (const link of validLinks) {
          await createGalleryItem(link);
        }
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error saving images.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-slate-900">
          Gallery
        </h1>
        <Button
          onClick={openCreate}
          className="bg-school-blue hover:bg-school-blue/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Images
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Alt Text</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-slate-500"
                >
                  No images found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.altText}
                      className="w-16 h-16 object-cover rounded bg-slate-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.category?.name || "Unknown"}
                  </TableCell>
                  <TableCell>{item.altText}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Images to Gallery</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Common Fields */}
            <div>
              <label className="text-sm font-medium text-slate-900 mb-1 block">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-school-blue focus:ring-offset-2"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-900 mb-1 block">
                Alt Text
              </label>
              <Input
                placeholder="e.g. Students in science lab"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                This text will apply to all images uploaded in this batch.
              </p>
            </div>

            {/* Upload Mode Toggle */}
            <div className="flex border rounded-lg p-1 bg-slate-50">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center transition-colors ${
                  uploadMode === "upload"
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setUploadMode("upload")}
              >
                <Upload className="w-4 h-4 mr-2" /> Local Files
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center transition-colors ${
                  uploadMode === "link"
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setUploadMode("link")}
              >
                <LinkIcon className="w-4 h-4 mr-2" /> Web Links
              </button>
            </div>

            {/* Upload Files Mode */}
            {uploadMode === "upload" && (
              <div className="space-y-3">
                <div
                  className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Click to select multiple images
                  </p>
                  <p className="text-xs text-slate-500">JPG, PNG, or WebP</p>
                </div>
                {filesToUpload.length > 0 && (
                  <div className="bg-slate-50 border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                    {filesToUpload.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white border p-2 rounded-md"
                      >
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileImage className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs truncate">{file.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile(i)}
                          className="text-red-500 hover:text-red-700 p-1 shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Web Links Mode */}
            {uploadMode === "link" && (
              <div className="space-y-3">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {externalLinks.map((link, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Input
                        placeholder="https://facebook.com/.../image.jpg"
                        value={link}
                        onChange={(e) => updateExternalLink(i, e.target.value)}
                      />
                      {externalLinks.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExternalLink(i)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addExternalLink}
                  className="w-full border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Another Link
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={onSubmitBulk} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {isSubmitting ? "Uploading..." : "Save Images"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this gallery item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
