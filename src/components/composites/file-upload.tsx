/**
 * FileUpload
 *
 * Drag-and-drop dropzone with click-to-browse fallback. Reads the chosen
 * file as text and forwards via `onFile`. Suits CSV imports and other
 * text-based uploads. For binary payloads use the native input directly.
 *
 * The dropzone has no vertical centering; wrap it in a layout container
 * (or pass `className`) to position it within the page.
 *
 * @example
 *   <FileUpload
 *     accept=".csv"
 *     label="Upload Expense CSV"
 *     hint="Date · Period · Name · Amount · Category"
 *     onFile={(text) => parseCSV(text)}
 *   />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  label: string;
  sublabel?: string;
  hint?: string;
  onFile: (content: string) => void;
  className?: string;
}

function FileUpload({
  accept = ".csv",
  label,
  sublabel,
  hint,
  onFile,
  className,
}: FileUploadProps) {
  const [dragging, setDragging] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleFile = React.useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => onFile(e.target?.result as string);
      reader.readAsText(file);
    },
    [onFile]
  );

  return (
    <div
      data-slot="file-upload"
      className={cn("flex items-center justify-center", className)}
    >
      <div
        className={cn(
          "max-w-[480px] cursor-pointer rounded-lg border-2 border-dashed p-14 text-center transition-all",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => fileRef.current?.click()}
      >
        <div className="mb-4 text-3xl text-primary/40" aria-hidden="true">
          &#11014;
        </div>
        <div className="mb-2 text-[15px] font-semibold">{label}</div>
        {sublabel ? (
          <div className="text-xs text-muted-foreground">{sublabel}</div>
        ) : null}
        {hint ? (
          <div className="mt-2 text-[11px] text-muted-foreground">{hint}</div>
        ) : null}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

export { FileUpload };
