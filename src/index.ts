import { Pinner } from "./pinner";
export const pin = async (blob: Blob, pinner: Pinner): Promise<string> => {
    const cid = await pinner(blob);
    return cid;
};