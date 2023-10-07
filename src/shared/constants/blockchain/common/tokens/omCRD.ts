import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CRD_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omCRD",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://t.me/c/1802432571/522",
    name: "OM DAO Wrapped Credora",
    title: "Credora",
};
