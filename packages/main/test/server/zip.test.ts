import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
} from 'vitest'
import { zipFilesServer } from '../../src/server/zip'
import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import os from 'os'

const tmpDir = path.join(os.tmpdir(), 'zip-test')

beforeEach(() => {
	fs.mkdirSync(tmpDir, { recursive: true })
})

afterEach(() => {
	fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('zipFilesServer', () => {
	it('creates a zip archive with provided files and calls hooks', async () => {
		// Create test files
		const file1Path = path.join(tmpDir, 'file1.txt')
		const file2Path = path.join(tmpDir, 'file2.txt')
		fs.writeFileSync(file1Path, 'hello')
		fs.writeFileSync(file2Path, 'world')

		const zipOutput = path.join(tmpDir, 'out.zip')

		// Setup hooks
		const onBeforeZip = vi.fn(async (paths: string[]) => paths)
		const onAfterZip = vi.fn()

		// Run zip
		await zipFilesServer([file1Path, file2Path], zipOutput, {
			onBeforeZip,
			onAfterZip,
		})

		// Assertions
		expect(fs.existsSync(zipOutput)).toBe(true)

		const zip = new AdmZip(zipOutput)
		const entries = zip
			.getEntries()
			.map((entry) => entry.entryName)

		expect(entries).toContain('file1.txt')
		expect(entries).toContain('file2.txt')

		expect(onBeforeZip).toHaveBeenCalledOnce()
		expect(onBeforeZip).toHaveBeenCalledWith([
			file1Path,
			file2Path,
		])

		expect(onAfterZip).toHaveBeenCalledOnce()
		expect(onAfterZip).toHaveBeenCalledWith(zipOutput)
	})
})
