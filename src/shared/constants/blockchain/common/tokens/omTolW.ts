import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_TOLW_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omTolW",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://t.me/c/1802432571/661",
    name: "OM DAO Wrapped Tollan Worlds",
    title: "Tollan Worlds",
};
