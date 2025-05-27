import JSZip from "jszip";

export function zipFilesClient(files: File[]): Promise<Blob> {
    const zip = new JSZip();
    for (const file of files) {
        zip.file(file.name, file);
    }
    return zip.generateAsync({ type: "blob" });
}

export async function unzipFileClient(blob: Blob): Promise<File[]> {
    const zip = await JSZip.loadAsync(blob);
    const files: File[] = [];

    for (const filename of Object.keys(zip.files)) {
        const fileData = await zip.files[filename]?.async('blob');
        files.push(new File([fileData as BlobPart], filename))
    }

    return files;
}