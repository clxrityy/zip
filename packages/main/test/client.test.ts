import { describe, it, expect } from "vitest";
import { zipFilesClient, unzipFileClient } from "../src";

describe("zipFilesClient", () => {
  it("should zip files correctly", async () => {
    const file1 = new File(["Hello"], "hello.txt", { type: "text/plain" });
    const file2 = new File(["World"], "world.txt", { type: "text/plain" });
    const files = [file1, file2];

    const zipBlob = await zipFilesClient(files);
    expect(zipBlob).toBeInstanceOf(Blob);
    expect(zipBlob.type).toBe("application/zip");
  });
});

describe("unzipFileClient", () => {
  it("should unzip files correctly", async () => {
    const file1 = new File(["Hello"], "hello.txt", { type: "text/plain" });
    const file2 = new File(["World"], "world.txt", { type: "text/plain" });
    const files = [file1, file2];

    const zipBlob = await zipFilesClient(files);
    const unzippedFiles = await unzipFileClient(zipBlob);

    expect(unzippedFiles).toHaveLength(2);
    expect(unzippedFiles[0].name).toBe("hello.txt");
    expect(unzippedFiles[1].name).toBe("world.txt");
  });
});
