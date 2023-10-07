import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CHAI_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwChai",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Chainalysis-ef0d077b3c974dc49d353f5840f15475",
    name: "OM DAO Wrapped Chainalysis",
    title: "Chainalysis",
};
