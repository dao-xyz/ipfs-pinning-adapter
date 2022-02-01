# IPFS pinning services adapter
[![Project license](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Project license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NPM version](https://img.shields.io/npm/v/@s2g/ipfs-pinning-adapter.svg?style=flat-square)](https://npmjs.com/@s2g/ipfs-pinning-adapter)
[![Size on NPM](https://img.shields.io/bundlephobia/minzip/@s2g/ipfs-pinning-adapter.svg?style=flat-square)](https://npmjs.com/@s2g/ipfs-pinning-adapter)

A library for a common interface towards different IPFS pinning services. 
Currently supports: 
* pinata.cloud
* nft.storage

The goal is to make a Buffer friendly interface towards different services.
## 
```typescript
import { getPinner as getPinnerPinata } from "../services/pinata";
import { getPinner as getPinnerNFTStorage } from "../services/nftstorage";
import { KeySecretConfig, SimpleConfig } from "../config";

const pinPinata = getPinnerPinata({... CONFIG ...})
const pinNftStorage = getPinnerNFTStorage({... CONFIG ...})

const buffer = Buffer.from ( ... Some UIntArray ...)
const cid1 = await pinPinata(buffer)
const cid2 = await pinNftStorage(buffer)
```

Please see [integration tests](src/__tests__/index.integration.test.ts) for working examples.

## Suggestions, problems?
Please create a ticket