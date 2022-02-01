import * as dotenv from "dotenv";
import { generateUUID } from "../utils";

dotenv.config();

describe("uuid", () => {
  test("success", async () => {
    // A silly test
    expect(generateUUID()).not.toEqual(generateUUID());
  });
});
