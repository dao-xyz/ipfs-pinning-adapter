import { Readable } from "stream";
import { KeySecretConfig } from "./config";
import { generateUUID, waitForCID } from "./utils";
import { IPFSAdapter } from "./adapter";
import axios from 'axios'
let pinata = require("@pinata/sdk")



export class PinataAdapter extends IPFSAdapter<KeySecretConfig> {
  client: any;
  constructor(config: KeySecretConfig) {
    super(config);
    this.client = pinata(config.apiKey, config.secret);
  }
  public async pin(buffer: Buffer, waitUntilPinned: boolean = false): Promise<string | undefined> {
    const stream = Readable.from(buffer);
    const fileName = new Date().getTime() + "_" + generateUUID(); // Filename is required by Pinata
    (stream as any).path = fileName;
    const result: { IpfsHash: string; PinSize: string; Timestamp: string } = await this.client.pinFileToIPFS(stream);
    const cid = result.IpfsHash;

    if (waitUntilPinned) {
      if (!await waitForCID(cid)) {
        return undefined;
      }
    }
    return cid;
  }

  public verify(): Promise<boolean> {
    return this.client.testAuthentication().then(() => {
      return true
    }).catch(() => {
      return false
    });

  }
}
