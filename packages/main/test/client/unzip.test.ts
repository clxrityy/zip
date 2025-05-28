import { describe, it, expect, vi } from 'vitest'
import JSZip from 'jszip'
import { unzipFileClient } from '../../src/client/unzip'

describe('unzipFileClient', () => {
	it('unzips a blob and calls hooks', async () => {
		// Prepare zip blob with JSZip
		const zip = new JSZip()
		zip.file('example.txt', 'hello world')
		const blob = await zip.generateAsync({ type: 'blob' })

		// Setup hooks
		const onEachFile = vi.fn()
		const onComplete = vi.fn()

		// Run unzip
		const files = await unzipFileClient(blob, {
			onEachFile,
			onComplete,
		})

		expect(files).toHaveLength(1)
		expect(files[0].name).toBe('example.txt')

		expect(onEachFile).toHaveBeenCalledOnce()
		expect(onEachFile).toHaveBeenCalledWith(files[0])

		expect(onComplete).toHaveBeenCalledOnce()
		expect(onComplete).toHaveBeenCalledWith(files)
	})
})
