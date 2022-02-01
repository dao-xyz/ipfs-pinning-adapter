"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinner = void 0;
const stream_1 = require("stream");
const utils_1 = require("../utils");
/**
 * pinata.cloud pinner
 * @param config
 * @returns pinner generator
 */
const getPinner = (config) => {
    const pinataSDK = require("@pinata/sdk");
    const pinata = pinataSDK(config.apiKey, config.secret);
    return (blob) => __awaiter(void 0, void 0, void 0, function* () {
        const arrayBuffer = yield blob.arrayBuffer();
        var view = new Uint8Array(arrayBuffer);
        var newBuffer = Buffer.from(view);
        const stream = stream_1.Readable.from(newBuffer);
        const fileName = new Date().getTime() + "_" + (0, utils_1.generateUUID)(); // Filename is required by Pinata
        stream.path = fileName;
        return pinata
            .pinFileToIPFS(stream)
            .then((result) => {
            return result.IpfsHash;
        });
    });
};
exports.getPinner = getPinner;
