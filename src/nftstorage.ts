import { NFTStorage } from "nft.storage";
import { SimpleConfig } from "./config";
import { Blob } from "nft.storage";
import { IPFSAdapter } from "./adapter";
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
}
