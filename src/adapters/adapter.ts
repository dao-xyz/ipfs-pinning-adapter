import { SimpleConfig } from "../config";

export abstract class IPFSAdapter<T extends SimpleConfig> {
  config: T;
  constructor(config: T) {
    this.config = config;
  }

  /**
   * @param buffer
   * returns CID
   */
  public pin(buffer: Buffer): Promise<string> {
    throw new Error("Not implemented");
  }
}
