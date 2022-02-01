import { NFTStorage } from "nft.storage";
import { SimpleConfig } from "../config";
import { Pinner } from "../pinner";
import { Blob } from "nft.storage";

/**
 * nft.storage pinner
 * @param config
 * @returns pinner generator
 */
export const getPinner = (config: SimpleConfig): Pinner => {
  const client = new NFTStorage({ token: config.apiKey });
  return (buffer: Buffer) => {
    let arraybuffer = Uint8Array.from(buffer).buffer;
    return client.storeBlob(new Blob([arraybuffer]));
  };
};
