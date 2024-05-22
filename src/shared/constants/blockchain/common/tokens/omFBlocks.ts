import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_FBlocks_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omFBlocks",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://www.fireblocks.com/",
    name: "OM DAO Wrapped FireBlocks",
    title: "FireBlocks",
};
