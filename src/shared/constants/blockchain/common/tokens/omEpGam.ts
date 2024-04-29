import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_EpGam_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omEpGam",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://ru.wikipedia.org/wiki/Epic_Games",
    name: "OM DAO Wrapped EpicGames",
    title: "EpicGames",
};
