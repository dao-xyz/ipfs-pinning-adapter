import axios from 'axios'

const WAIT_DELAY = 500;
const MAX_WAIT = 1000 * 30;

export const generateUUID = (): string => {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};
export const waitForCID = async (cid: string): Promise<boolean> => {
    let startTime = new Date().getTime()
    while (new Date().getTime() - startTime < MAX_WAIT) {
        let resp = await axios.get("https://ipfs.io/ipfs/" + cid);
        if (resp.status == 200) {
            return true;
        }
        await new Promise(r => setTimeout(r, WAIT_DELAY));

    }
    return false;
}