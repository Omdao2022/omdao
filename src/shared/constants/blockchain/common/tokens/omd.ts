import { ITokenConstants } from "../types";
import { OMDAO_ABI } from "../abis";

export const COMMON_OMD_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "OMD",
    abi: OMDAO_ABI,
    decimal: "6",
    herf: "https://omdao.vc",
    name: "OM DAO",
    title: "OM DAO",
};
