import AdmZip from 'adm-zip'
import path from 'path'

export interface UnzipServerOptions {
	onEachFile?: (filePath: string) => void | Promise<void>
	onComplete?: (extractedPaths: string[]) => void | Promise<void>
}

export async function unzipFileServer(
	zipPath: string,
	extractTo: string,
	options?: UnzipServerOptions
): Promise<void> {
	const zip = new AdmZip(zipPath)
	// zip.extractAllTo(extractTo, true);
	zip.extractAllTo(extractTo, true)
	if (options?.onEachFile) {
		await Promise.all(
			zip.getEntries().map(async (entry) => {
				if (!entry.isDirectory) {
					const filePath = path.join(
						extractTo,
						entry.entryName
					)
					await options.onEachFile?.(filePath)
				}
			})
		)
	}
	if (options?.onComplete) {
		await options.onComplete(
			zip.getEntries().map((entry) => entry.entryName)
		)
	}
}
