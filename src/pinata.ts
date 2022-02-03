import { Readable } from "stream";
import { KeySecretConfig } from "./config";
import { generateUUID } from "./utils";
import { IPFSAdapter } from "./adapter";

export class PinataAdapter extends IPFSAdapter<KeySecretConfig> {
  client: any;
  constructor(config: KeySecretConfig) {
    super(config);
    this.client = require("@pinata/sdk")(config.apiKey, config.secret);
  }
  public pin(buffer: Buffer): Promise<string> {
    const stream = Readable.from(buffer);
    const fileName = new Date().getTime() + "_" + generateUUID(); // Filename is required by Pinata
    (stream as any).path = fileName;
    return this.client
      .pinFileToIPFS(stream)
      .then(
        (result: { IpfsHash: string; PinSize: string; Timestamp: string }) => {
          return result.IpfsHash;
        }
      );
  }
}
