"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const pinata_1 = require("../services/pinata");
const nftstorage_1 = require("../services/nftstorage");
const dotenv = __importStar(require("dotenv"));
const nft_storage_1 = require("nft.storage"); // Dependency on "nft.storage" here, but this just to get a moch Blob for Node
dotenv.config();
describe("store blob", () => {
    test("pinata", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            apiKey: process.env.PINATA_API_KEY,
            secret: process.env.PINATA_SECRET_KEY,
        };
        const blob = new nft_storage_1.Blob(["blobbable"]);
        const result = yield (0, pinata_1.getPinner)(config)(blob);
        expect(result.length).toBeGreaterThan(0); // some cid
    }));
    test("nft.storage", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            apiKey: process.env.NFT_STORAGE_API_KEY,
        };
        const blob = new nft_storage_1.Blob([JSON.stringify({ k: "k" })]);
        const result = yield (0, nftstorage_1.getPinner)(config)(blob);
        expect(result.length).toBeGreaterThan(0); // some cid
    }));
});
