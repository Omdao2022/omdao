import { ITokenConstants } from "../types";
import { ARADENA_TOKEN_ABI } from "../abis";

export const COMMON_AG_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "AG",
    abi: ARADENA_TOKEN_ABI,
    decimal: "18",
    herf: "https://selectedpublic.notion.site/Aradena-8a79e3ddb7174c128dbb2e68484fe0d2",
    name: "Aradenean Gold",
    title: "Aradenean Gold",
};
