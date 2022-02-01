import { Readable } from "stream";
import { KeySecretConfig } from "../config";
import { Pinner } from "../pinner";
import { generateUUID } from "../utils";

/**
 * pinata.cloud pinner
 * @param config
 * @returns pinner generator
 */
export const getPinner = (config: KeySecretConfig): Pinner => {
  const pinataSDK = require("@pinata/sdk");
  const pinata = pinataSDK(config.apiKey, config.secret);
  return async (blob: Blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    var view = new Uint8Array(arrayBuffer);
    var newBuffer = Buffer.from(view);
    const stream = Readable.from(newBuffer);
    const fileName = new Date().getTime() + "_" + generateUUID(); // Filename is required by Pinata
    (stream as any).path = fileName;
    return pinata
      .pinFileToIPFS(stream)
      .then(
        (result: { IpfsHash: string; PinSize: string; Timestamp: string }) => {
          return result.IpfsHash;
        }
      );
  };
};
