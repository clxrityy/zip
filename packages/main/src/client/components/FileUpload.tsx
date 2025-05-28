import {
	ComponentProps,
	JSX,
	useCallback,
	useRef,
	useState,
} from 'react'
import { zipFilesClient, type ZipClientOptions } from '../zip'
import { unzipFileClient, type UnzipClientOptions } from '../unzip'

export interface FileUploadProps extends ComponentProps<'input'> {
	mode?: 'zip' | 'unzip'
	onBeforeZip?: ZipClientOptions['onBeforeZip']
	onAfterZip?: ZipClientOptions['onAfterZip']
	onEachUnzippedFile?: UnzipClientOptions['onEachFile']
	onUnzipComplete?: UnzipClientOptions['onComplete']
	onError?: (error: unknown) => void
}

/**
 * FileUpload component allows users to upload files for zipping or unzipping.
 * - In "zip" mode, it zips multiple files into a single zip file.
 * - In "unzip" mode, it unzips a single zip file and processes each file.
 * It provides callbacks for before and after zipping, processing each unzipped file, and handling errors.
 * @example
 * ```tsx
 * <FileUpload
 *   mode="zip"
 *   onBeforeZip={(files) => console.log("Zipping files:", files)}
 *   onAfterZip={(zipFile) => console.log("Zipped file:", zipFile)}
 *   onEachUnzippedFile={(file) => console.log("Unzipped file:", file)}
 *   onUnzipComplete={(files) => console.log("Unzipping complete", files)}
 *   onError={(error) => console.error("Error:", error)}
 * />
 * ```
 */
export function FileUpload({
	mode = 'zip',
	onBeforeZip = void 0,
	onAfterZip = void 0,
	onEachUnzippedFile = void 0,
	onUnzipComplete = void 0,
	onError = void 0,
	...props
}: FileUploadProps): JSX.Element {
	const [status, setStatus] = useState<string | null>(null)

	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		inputRef.current?.click()
	}

	const handleFiles = useCallback(
		async (files: FileList | null) => {
			if (!files || files.length === 0) return

			try {
				setStatus('Processing...')
				const fileArray = Array.from(files)

				if (mode === 'zip') {
					await zipFilesClient(fileArray, {
						onBeforeZip,
						onAfterZip,
					})
					setStatus('Files zipped successfully')
				} else {
					const zipFile = fileArray[0]
					if (zipFile?.type !== 'application/zip') {
						setStatus('Error: Invalid zip file')
						throw new Error(
							'Please upload a valid zip file'
						)
					}

					await unzipFileClient(zipFile, {
						onEachFile: onEachUnzippedFile,
						onComplete: onUnzipComplete,
					})
					setStatus('Files unzipped successfully')
				}
			} catch (e) {
				setStatus('Error processing files')
				if (onError) onError(e)
				else console.error(e)
			}
		},
		[
			mode,
			onBeforeZip,
			onAfterZip,
			onEachUnzippedFile,
			onUnzipComplete,
			onError,
		]
	)

	return (
		<div
			onClick={handleClick}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10px',
				padding: '20px',
				border: '1px dashed #aaa',
				borderRadius: '5px',
				cursor: 'pointer',
			}}>
			<input
				data-testid="file-input"
				type="file"
				multiple={mode === 'zip'}
				accept={mode === 'unzip' ? '.zip' : undefined}
				onChange={(e) => {
					handleFiles(e.target.files)
					props.onChange?.(e)
				}}
				onClick={(e) => {
					// Reset the input value to allow re-uploading the same file
					e.currentTarget.value = ''
				}}
				style={{
					display: 'none',
					...props.style,
				}}
				id="file-upload-input"
				ref={inputRef}
				{...props}
			/>
			{status && (
				<p data-testid="file-upload-status">{status}</p>
			)}
		</div>
	)
}
