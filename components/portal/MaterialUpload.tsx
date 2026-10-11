"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { createMaterialRecordAction, removeMaterialRecordAction } from "@/app/actions/teacher";
import { getMaterialSignedUrlAction } from "@/app/actions/teacher";

const allowed = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "audio/mpeg", "audio/mp4", "video/mp4", "text/plain"]);

export function MaterialUpload({ lang, classes }: { lang: "en" | "ar" | "fr"; classes: { id: string; name: string }[] }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    setMessage("");
    const file = formData.get("file");
    if (!(file instanceof File) || !allowed.has(file.type) || file.size < 1 || file.size > 50 * 1024 * 1024) {
      setMessage("Choose a supported PDF, image, audio, video, or text file up to 50 MB.");
      return;
    }
    const record = await createMaterialRecordAction({
      class_group_id: String(formData.get("class_group_id") ?? ""),
      student_id: undefined,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      lang,
    });
    if (!record.ok) { setMessage(record.error); return; }
    setBusy(true);
    try {
      const client = createSupabaseBrowserClient();
      const { error } = await client.storage.from(record.bucket).upload(record.path, file, { contentType: file.type, upsert: false });
      if (error) {
        await removeMaterialRecordAction(record.id, lang);
        setMessage("The upload failed. Please try again.");
      } else {
        setMessage("Material uploaded and shared with the selected class.");
        const form = document.querySelector<HTMLFormElement>("#material-upload-form");
        form?.reset();
        window.location.reload();
      }
    } catch {
      await removeMaterialRecordAction(record.id, lang);
      setMessage("The upload failed. Please check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form id="material-upload-form" action={submit} className="grid gap-3 sm:grid-cols-2">
    <label className="text-xs font-semibold">Class<select name="class_group_id" required className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm">{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
    <label className="text-xs font-semibold">Material title<input name="title" required minLength={2} maxLength={160} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label>
    <label className="text-xs font-semibold">File<input name="file" type="file" required accept=".pdf,.jpg,.jpeg,.png,.webp,.mp3,.m4a,.mp4,.txt" className="mt-1 block min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-2 py-2 text-xs"/></label>
    <label className="text-xs font-semibold sm:col-span-2">Description (optional)<textarea name="description" maxLength={1000} rows={2} className="mt-1 w-full rounded-xl border border-[#D6E8F1] px-3 py-2 text-sm"/></label>
    {message && <p role="status" className="text-sm text-[#087CC1] sm:col-span-2">{message}</p>}
    <div className="sm:col-span-2"><button disabled={busy || classes.length === 0} className="min-h-11 rounded-xl bg-[#001A3F] px-5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Uploading…" : "Upload learning material"}</button></div>
  </form>;
}

export function MaterialDownloadButton({ id, lang }: { id: string; lang: "en" | "ar" | "fr" }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function openMaterial() {
    setBusy(true); setError("");
    try {
      const url = await getMaterialSignedUrlAction(id, lang);
      if (!url) { setError("This file is unavailable or you do not have access."); return; }
      window.open(url, "_blank", "noopener,noreferrer");
    } catch { setError("Could not open this file. Please try again."); }
    finally { setBusy(false); }
  }
  return <span className="inline-flex flex-col items-end gap-1"><button type="button" onClick={openMaterial} disabled={busy} className="min-h-10 rounded-xl bg-[#E8F7FF] px-3 text-xs font-bold text-[#087CC1] hover:bg-[#D8F0FC] focus-visible:outline-2 focus-visible:outline-[#35B8FF] disabled:opacity-50">{busy ? "Opening…" : "Open file"}</button>{error && <span role="alert" className="text-[10px] text-red-700">{error}</span>}</span>;
}
