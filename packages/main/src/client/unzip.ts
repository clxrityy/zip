import JSZip from "jszip";

export interface UnzipClientOptions {
  onEachFile?: (file: File) => void | Promise<void>;
  onComplete?: (files: File[]) => void | Promise<void>;
}

export async function unzipFileClient(
  blob: Blob,
  options?: UnzipClientOptions,
): Promise<File[]> {
  const zip = await JSZip.loadAsync(blob);
  const files: File[] = [];

  await Promise.all(
    Object.entries(zip.files).map(async ([name, entry]) => {
      if (!entry.dir) {
        const content = await entry.async("blob");
        const file = new File([content], name);
        if (options?.onEachFile) {
          await options.onEachFile(file);
        }
        files.push(file);
      }
    }),
  );

  if (options?.onComplete) {
    await options.onComplete(files);
  }

  return files;
}
