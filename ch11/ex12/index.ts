import { statSync } from "fs";

export class FileSizeOverError extends Error {
  readonly filePath: string;
  readonly maxSize: number;
  constructor(filePath: string, maxSize: number) {
    super();
    this.filePath = filePath;
    this.maxSize = maxSize;
  }

  get fileSize(): number {
    return statSync(this.filePath).size;
  }

  get sizeOfExcess(): number {
    const size = this.fileSize;
    return size - this.maxSize > 0 ? size - this.maxSize : 0;
  }

  override get name(): string {
    return "File size over error";
  }

  override get message(): string {
    return `file size: ${this.fileSize} max size: ${this.maxSize} size of excess: ${this.sizeOfExcess}`;
  }
}
