import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_ZELY_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omZely",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://zealy.io/",
    name: "OM DAO Wrapped Zealy",
    title: "Zealy",
};
