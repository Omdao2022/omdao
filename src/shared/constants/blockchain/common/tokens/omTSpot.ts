import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_TSpot_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omTSpot",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://thoughtspot.com/",
    name: "OM DAO Wrapped ThoughtSpot",
    title: "ThoughtSpot",
};
