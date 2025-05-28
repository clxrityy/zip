import JSZip from 'jszip'

export interface ZipClientOptions {
	onBeforeZip?: (files: File[]) => Promise<File[]> | File[]
	onAfterZip?: (blob: Blob) => void | Promise<void>
}

export async function zipFilesClient(
	files: File[],
	options?: ZipClientOptions
): Promise<Blob> {
	const zip = new JSZip()

	const processedFiles = options?.onBeforeZip
		? await options.onBeforeZip(files)
		: (files ?? [])

	for (const file of processedFiles) {
		zip.file(file.name, file)
	}

	const zipBlob = await zip.generateAsync({ type: 'blob' })

	if (options?.onAfterZip) {
		await options.onAfterZip(zipBlob)
	}

	return zipBlob
}
