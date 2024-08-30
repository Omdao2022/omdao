import React, { FC } from "react";
import TokenList from "../../features/user-holding-tokens/ui/UserHolding";

const MyInvestments: FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold font-sans m-6 flex justify-center">
                My Investments
            </h1>
            <TokenList/>
        </div>
    )
}

export default MyInvestments;