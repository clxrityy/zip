import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { FileUpload } from "../src";

// Mock the zip/unzip client functions
vi.mock("../src/client/zip", () => ({
  zipFilesClient: vi.fn().mockResolvedValue(
    new Blob(["dummy"], {
      type: "application/zip",
    }),
  ),
}));

vi.mock("../src/client/unzip", () => ({
  unzipFileClient: vi
    .fn()
    .mockResolvedValue([
      new File(["unzip1"], "file1.txt"),
      new File(["unzip2"], "file2.txt"),
    ]),
}));

describe("<FileUpload />", () => {
  // Zip mode test
  it("zips files and shows success message", async () => {
    render(<FileUpload mode="zip" />);

    const input = screen.getByTestId("file-input");
    const file = new File(["test content"], "test.txt", {
      type: "text/plain",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(screen.getByText(/zipped successfully/i)).toBeDefined();
    });
  });

  // Unzip mode test
  it("unzips files and shows success message", async () => {
    render(<FileUpload mode="unzip" />);

    const input = screen.getByTestId("file-input");
    const zipFile = new File(["dummy zip content"], "test.zip", {
      type: "application/zip",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [zipFile] },
    });

    await waitFor(() => {
      expect(screen.getByText(/unzipped successfully/i)).toBeDefined();
    });
  });
});
