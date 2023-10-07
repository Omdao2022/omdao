import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_DB_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omDB",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://t.me/c/1802432571/439",
    name: "OM DAO Wrapped deBridge",
    title: "deBridge",
};
