import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_LED_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwLed",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://www.notion.so/selectedpublic/Ledger-d1e8be65607741d0aa07c482b45333c5",
    name: "OM DAO Wrapped Ledger",
    title: "Ledger",
};
