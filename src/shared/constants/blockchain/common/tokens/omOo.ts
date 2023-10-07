import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_OO_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omOo",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://youtu.be/NNS2NnZ67xs",
    name: "OM DAO Wrapped omOo",
    title: "Oo",
};
