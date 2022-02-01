"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinner = void 0;
const nft_storage_1 = require("nft.storage");
/**
 * nft.storage pinner
 * @param config
 * @returns pinner generator
 */
const getPinner = (config) => {
    const client = new nft_storage_1.NFTStorage({ token: config.apiKey });
    return (blob) => {
        return client.storeBlob(blob);
    };
};
exports.getPinner = getPinner;
