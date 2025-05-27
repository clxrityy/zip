import { describe, it, expect, vi, beforeEach } from 'vitest';

// Define mocks
const addLocalFileMock = vi.fn();
const writeZipMock = vi.fn();
const extractAllToMock = vi.fn();

// Top-level mock — MUST be before imports
vi.mock('adm-zip', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      addLocalFile: addLocalFileMock,
      writeZip: writeZipMock,
      extractAllTo: extractAllToMock,
    })),
  };
});

// Import after mocks
import { zipFilesServer, unzipFileServer } from '../src';

describe('zipFilesServer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should zip files correctly", () => {
        const inputPaths = ['test1.txt', 'test2.txt'];
        const outputPath = 'output.zip';

        zipFilesServer(inputPaths, outputPath);

        expect(addLocalFileMock).toHaveBeenCalledTimes(2);
        expect(addLocalFileMock).toHaveBeenCalledWith('test1.txt');
        expect(addLocalFileMock).toHaveBeenCalledWith('test2.txt');
        expect(writeZipMock).toHaveBeenCalledWith(outputPath);
    })
});

describe('unzipFileServer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should unzip files correctly", () => {
        const zipPath = 'input.zip';
        const extractTo = 'output/';

        unzipFileServer(zipPath, extractTo);

        expect(extractAllToMock).toHaveBeenCalledWith(extractTo, true);
    });
});