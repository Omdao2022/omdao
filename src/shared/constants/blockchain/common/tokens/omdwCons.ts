import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_CONS_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omdwCons",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://selectedpublic.notion.site/ConsenSys-e538fbe363ea4bbd9165a7aec7aa5fc1",
    name: "OM DAO Wrapped Consensys",
    title: "ConsenSys",
};
