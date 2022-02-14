import { PinataAdapter } from "../pinata";
import { NftStorageAdapter } from "../nftstorage";

import * as dotenv from "dotenv";
import { KeySecretConfig, SimpleConfig } from "../config";

/**
 * Integration tests requires a valid .env with API keys (we are not moching pinning services here)
 * We want to make sure the adaptors really work with all contingencies
 */
dotenv.config();

describe("pinata", () => {
  test("pin", async () => {
    const config: KeySecretConfig = {
      apiKey: process.env.PINATA_API_KEY as string,
      secret: process.env.PINATA_SECRET_KEY as string,
    };
    const result = await new PinataAdapter(config).pin(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
    );
    expect(result.length).toBeGreaterThan(0); // some cid
  });
  test("verify", async () => {
    const config: KeySecretConfig = {
      apiKey: process.env.PINATA_API_KEY as string,
      secret: process.env.PINATA_SECRET_KEY as string,
    };
    expect(await new PinataAdapter(config).verify()).toBeTruthy(); // some cid

    const config_bad: KeySecretConfig = {
      apiKey: "abc" as string,
      secret: "123" as string,
    };
    expect(await new PinataAdapter(config_bad).verify()).toBeFalsy(); // some cid
  });
});

describe("nft.storage", () => {
  test("pin", async () => {
    const config: SimpleConfig = {
      apiKey: process.env.NFT_STORAGE_API_KEY as string,
    };
    const result = await new NftStorageAdapter(config).pin(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
    );
    expect(result.length).toBeGreaterThan(0); // some cid
  });

  test("verify", async () => {
    const config: SimpleConfig = {
      apiKey: process.env.NFT_STORAGE_API_KEY as string,
    };
    expect(await new NftStorageAdapter(config).verify()).toBeTruthy(); // some cid

    const config_bad: KeySecretConfig = {
      apiKey: "abc" as string,
      secret: "123" as string,
    };
    expect(await new NftStorageAdapter(config_bad).verify()).toBeFalsy(); // some cid
  });
});
