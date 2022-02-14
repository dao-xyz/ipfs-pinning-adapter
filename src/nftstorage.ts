import { NFTStorage } from "nft.storage";
import { SimpleConfig } from "./config";
import { Blob } from "nft.storage";
import { IPFSAdapter } from "./adapter";
import { generateUUID } from "./utils";
export class NftStorageAdapter extends IPFSAdapter<SimpleConfig> {
  client: NFTStorage;
  constructor(config: SimpleConfig) {
    super(config);
    this.client = new NFTStorage({ token: config.apiKey });
  }
  public pin(buffer: Buffer): Promise<string> {
    let arraybuffer = Uint8Array.from(buffer).buffer;
    return this.client.storeBlob(new Blob([arraybuffer]));
  }
  public verify(): Promise<boolean> {
    // Upload a dummy file
    const textEncoder = new TextEncoder();

    // upload random blob
    const promise = this.client.storeBlob(new Blob([textEncoder.encode(generateUUID())]));
    return promise.then(async (cid) => {
      await this.client.delete(cid) // delete it also, we do not want to create unecessary data
      return true
    }).catch(() => {
      return false;
    })
  }
}
