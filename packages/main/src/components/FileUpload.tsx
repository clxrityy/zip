"use client";
import { ComponentProps, useCallback, useState } from "react";
import {
  zipFilesClient,
  unzipFileClient,
  type ZipClientOptions,
  type UnzipClientOptions,
} from "../client";

export interface FileUploadProps extends ComponentProps<"input"> {
  mode?: "zip" | "unzip";
  onBeforeZip?: ZipClientOptions["onBeforeZip"];
  onAfterZip?: ZipClientOptions["onAfterZip"];
  onEachUnzippedFile?: UnzipClientOptions["onEachFile"];
  onUnzipComplete?: UnzipClientOptions["onComplete"];
  onError?: (error: unknown) => void;
}

export function FileUpload({
  mode = "zip",
  onBeforeZip,
  onAfterZip,
  onEachUnzippedFile,
  onUnzipComplete,
  onError,
  ...props
}: FileUploadProps) {
  const [status, setStatus] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      try {
        setStatus("Processing...");
        const fileArray = Array.from(files);

        if (mode === "zip") {
          await zipFilesClient(fileArray, {
            onBeforeZip,
            onAfterZip,
          });
          setStatus("Files zipped successfully");
        } else {
          const zipFile = fileArray[0];
          if (zipFile?.type !== "application/zip") {
            throw new Error("Please upload a valid zip file");
          }

          await unzipFileClient(zipFile, {
            onEachFile: onEachUnzippedFile,
            onComplete: onUnzipComplete,
          });
          setStatus("Files unzipped successfully");
        }
      } catch (e) {
        setStatus("Error processing files");
        if (onError) onError(e);
        else console.error(e);
      }
    },
    [
      mode,
      onBeforeZip,
      onAfterZip,
      onEachUnzippedFile,
      onUnzipComplete,
      onError,
    ],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
        border: "1px dashed #aaa",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <input
        data-testid="file-input"
        type="file"
        multiple={mode === "zip"}
        accept={mode === "unzip" ? ".zip" : undefined}
        onChange={(e) => {
          handleFiles(e.target.files);
          props.onChange?.(e);
        }}
        onClick={(e) => {
          // Reset the input value to allow re-uploading the same file
          e.currentTarget.value = "";
        }}
        style={{
          display: "none",
          ...props.style,
        }}
        id="file-upload-input"
        {...props}
      />
      {status && <p>{status}</p>}
    </div>
  );
}
