import { ITokenConstants } from "../types";
import { WRAPPED_TOKEN_ABI } from "../abis";

export const COMMON_WEBI_DATA: Omit<ITokenConstants, "address"> = {
    symbol: "omWeBi",
    abi: WRAPPED_TOKEN_ABI,
    decimal: "6",
    herf: "https://wandb.ai/site",
    name: "OM DAO Wrapped WeightsBiases",
    title: "WeightsBiases",
};
