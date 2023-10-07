import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_KRK_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omKrk",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://www.kraken.com/",
    name: "OM DAO Wrapped Kraken",
    title: "Kraken",
};
