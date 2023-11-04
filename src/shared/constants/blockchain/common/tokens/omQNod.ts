import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_QNod_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omQNod",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://www.quicknode.com/",
    name: "OM DAO Wrapped QuickNode",
    title: "QuickNode",
};
