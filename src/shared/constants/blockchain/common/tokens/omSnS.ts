import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_SnS_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omSnS",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://t.me/c/1802432571/439",
    name: "OM DAO Wrapped SambaNovaSystems",
    title: "SambaNovaSystems",
};
