import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CONT_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwCont",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/Contango-c61be1a2aaf4438cbb1567b25ec10275",
    name: "OM DAO Wrapped Contango",
    title: "Contango",
};
