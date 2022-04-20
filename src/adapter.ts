import { SimpleConfig } from "./config";

export abstract class IPFSAdapter<T extends SimpleConfig> {
  config: T;
  constructor(config: T) {
    this.config = config;
  }

  /**
   * @param buffer
   * returns CID
   */
  public pin(buffer: Buffer, waitUntilPinned: boolean = false): Promise<string | undefined> {
    throw new Error("Not implemented");
  }

  public verify(): Promise<boolean> {
    throw new Error("Not implemented")
  }
}
