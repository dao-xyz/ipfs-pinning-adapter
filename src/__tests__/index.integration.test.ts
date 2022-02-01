import { getPinner as getPinnerPinata } from "../services/pinata";
import { getPinner as getPinnerNFTStorage } from "../services/nftstorage";

import * as dotenv from "dotenv";
import { KeySecretConfig, SimpleConfig } from "../config";

/**
 * Integration tests requires a valid .env with API keys (we are not moching pinning services here)
 * We want to make sure the adaptors really work with all contingencies
 */
dotenv.config();

describe("store blob", () => {
  test("pinata", async () => {
    const config: KeySecretConfig = {
      apiKey: process.env.PINATA_API_KEY as string,
      secret: process.env.PINATA_SECRET_KEY as string,
    };
    const result = await getPinnerPinata(config)(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
    );
    expect(result.length).toBeGreaterThan(0); // some cid
  });

  test("nft.storage", async () => {
    const config: SimpleConfig = {
      apiKey: process.env.NFT_STORAGE_API_KEY as string,
    };
    const result = await getPinnerNFTStorage(config)(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
    );
    expect(result.length).toBeGreaterThan(0); // some cid
  });
});
