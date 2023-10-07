import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_ARA_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omAra",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Aradena-8a79e3ddb7174c128dbb2e68484fe0d2",
    name: "OM DAO Wrapped Aradena",
    title: "Aradena",
};
