import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_GGq_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omGGq",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://devpost.com/software/ggquest",
    name: "OM DAO Wrapped GGQuest",
    title: "ggQuest",
};
