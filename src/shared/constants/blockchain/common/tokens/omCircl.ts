import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CIRCL_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omCircl",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://www.circle.com/en/",
    name: "OM DAO Wrapped Circle",
    title: "Circle",
};
