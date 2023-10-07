import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_MS_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwMS",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Magic-Square-45994ad5105742b4b1cd8deb0d6feff5",
    name: "OM DAO Wrapped Magic Square",
    title: "Magic Square",
};
