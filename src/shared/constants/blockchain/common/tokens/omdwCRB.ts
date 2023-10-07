import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CRB_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwCRB",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Cross-River-46adffcd372143f3b81e486d518ab222",
    name: "OM DAO Wrapped Cross River Bank",
    title: "Cross River",
};
