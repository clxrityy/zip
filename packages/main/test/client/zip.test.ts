import { describe, it, expect, vi, beforeEach } from 'vitest'
import { zipFilesClient } from '../../src/client'

class MockJSZip {
	file = vi.fn()
	generateAsync = vi.fn()
}

// Mock JSZip import
vi.mock('jszip', () => {
	return {
		default: vi.fn(() => new MockJSZip()),
	}
})

describe('zipFilesClient', () => {
	let fakeZip: MockJSZip

	beforeEach(async () => {
		vi.clearAllMocks()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const JSZip = (await import('jszip')).default as any
		fakeZip = new JSZip() as unknown as MockJSZip

		JSZip.mockImplementation(() => fakeZip)
	})

	const createMockFile = (name: string, content = 'data') =>
		new File([content], name, {
			type: 'text/plain',
		})

	it('zips files without hooks', async () => {
		const file1 = createMockFile('file1.txt')
		const file2 = createMockFile('file2.txt')

		const zipBlob = new Blob(['zip content'], {
			type: 'application/zip',
		})
		fakeZip.generateAsync.mockResolvedValue(zipBlob)

		const result = await zipFilesClient([file1, file2])

		expect(fakeZip.file).toHaveBeenCalledTimes(2)
		expect(fakeZip.file).toHaveBeenCalledWith('file1.txt', file1)
		expect(fakeZip.file).toHaveBeenCalledWith('file2.txt', file2)

		expect(fakeZip.generateAsync).toHaveBeenCalledWith({
			type: 'blob',
		})
		expect(result).toBe(zipBlob)
	})

	it('calls onBeforeZip hook and uses its returned files', async () => {
		const fileA = createMockFile('a.txt')
		const fileB = createMockFile('b.txt')
		const fileC = createMockFile('c.txt')

		fakeZip.generateAsync.mockResolvedValue(
			new Blob(['custom-zip'])
		)

		const onBeforeZip = vi.fn().mockResolvedValue([fileC])

		await zipFilesClient([fileA, fileB], { onBeforeZip })

		expect(onBeforeZip).toHaveBeenCalledWith([fileA, fileB])
		expect(fakeZip.file).toHaveBeenCalledTimes(1)
		expect(fakeZip.file).toHaveBeenCalledWith('c.txt', fileC)
	})

	it('calls onAfterZip with resulting blob', async () => {
		const file = createMockFile('x.txt')
		const mockBlob = new Blob(['zip-result'])

		fakeZip.generateAsync.mockResolvedValue(mockBlob)

		const onAfterZip = vi.fn()

		await zipFilesClient([file], { onAfterZip })

		expect(fakeZip.file).toHaveBeenCalledWith('x.txt', file)
		expect(onAfterZip).toHaveBeenCalledWith(mockBlob)
	})
})
