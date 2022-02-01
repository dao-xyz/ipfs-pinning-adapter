import { NFTStorage } from "nft.storage";
import { SimpleConfig } from "../config";
import { Pinner } from "../pinner";

/**
 * nft.storage pinner
 * @param config
 * @returns pinner generator
 */
export const getPinner = (config: SimpleConfig): Pinner => {
  const client = new NFTStorage({ token: config.apiKey });
  return (blob: Blob) => {
    return client.storeBlob(blob);
  };
};
