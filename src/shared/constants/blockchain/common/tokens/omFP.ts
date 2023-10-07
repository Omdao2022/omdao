import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_FP_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omFP",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://t.me/c/1802432571/432",
    name: "OM DAO Wrapped FlexPort",
    title: "Flexport",
};
