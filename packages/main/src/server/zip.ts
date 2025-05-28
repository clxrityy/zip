import AdmZip from 'adm-zip'

export interface ZipServerOptions {
	onBeforeZip?: (paths: string[]) => Promise<string[]> | string[]
	onAfterZip?: (outputPath: string) => void | Promise<void>
}

export async function zipFilesServer(
	inputPaths: string[],
	outputPath: string,
	options?: ZipServerOptions
): Promise<void> {
	const zip = new AdmZip()
	const paths = options?.onBeforeZip
		? await options.onBeforeZip(inputPaths)
		: inputPaths

	paths.forEach((file) => zip.addLocalFile(file))
	zip.writeZip(outputPath)

	if (options?.onAfterZip) {
		await options.onAfterZip(outputPath)
	}
}
