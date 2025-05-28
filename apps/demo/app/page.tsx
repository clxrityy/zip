'use client'
import { FileUpload } from '@clxrity/zip/client'

export default function Home() {
	return (
		<div className="w-screen mx-auto mt-10 h-screen">
			<div className="flex flex-col items-center p-6 rounded-lg shadow-lg w-full h-full justify-center gap-5">
				<h1 className="text-2xl font-bold mb-4">
					File Upload Example
				</h1>
				<FileUpload
					mode="zip"
					onBeforeZip={(files) => {
						console.log('zipping', files)
						return files.map(
							(file) =>
								new File(
									[file],
									`zipped-${file.name}`
								)
						)
					}}
				/>
			</div>
		</div>
	)
}
