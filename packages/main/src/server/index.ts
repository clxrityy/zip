import AdmZip from 'adm-zip';


export function zipFilesServer(inputPaths: string[], outputPath: string): void {
    const zip = new AdmZip();
    inputPaths.forEach(file => zip.addLocalFile(file));
    zip.writeZip(outputPath);
}

export function unzipFileServer(zipPath: string, extractTo: string): void {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractTo, true);
}