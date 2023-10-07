import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_DELC_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwDelC",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://github.com/0xfoobar/delegate-cash-frontend",
    name: "OM DAO Wrapped Delegate Cash",
    title: "Delegate Cash",
};
