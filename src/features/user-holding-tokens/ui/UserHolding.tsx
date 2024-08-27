import React, { useState, useEffect } from "react";
import { ETHEREUM_TOKENS } from "../../../shared/constants/blockchain";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
interface TokenHoldingList {
  symbol: string;
  balance: string;
  address: string;
}

const TokenList: React.FC = () => {
  const [tokenAmountList, setTokenAmountList] = useState<TokenHoldingList[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { isConnected, address } = useAccount();
  const itemsPerPage = 4;

  const filteredTokens:TokenHoldingList[]=[];

  const getTokenHolding = async () => {
    return new Promise<TokenHoldingList[]>(async (resolve) => {
      const tokenList = Object.values(ETHEREUM_TOKENS);
      tokenAmountList.length = 0;
      for (let tokenObj of tokenList) {
        const tokenContract = new ethers.Contract(
          tokenObj.address,
          tokenObj.abi,
          provider
        );
        // Get the balance
        const balance = await tokenContract.balanceOf(address);

        // Convert balance from BigNumber to a readable format (if necessary)
        const decimals = await tokenContract.decimals();
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        tokenAmountList.push({
          symbol: tokenObj.symbol,
          balance: formattedBalance,
          address: tokenObj.address,
        });
        // tokenAmountList.push({ ...tokenObj, "tokenBalance": formattedBalance });

        console.log(`Token Balance of ${address}: ${formattedBalance}`);
      }
      resolve(tokenAmountList);
    });
  };

  useEffect(() => {
    const fetchTokenAmounts = async () => {
      setLoading(true);
      try {
        // Replace this with your actual fetching logic
        const fetchedTokens = await getTokenHolding(); // Assume this function fetches the token amounts
        console.log("fetchTokens", fetchedTokens);
        setTokenAmountList(fetchedTokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAmounts();
     tokenAmountList.filter((item) => Number(item.balance) > 0);

  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="container mx-auto">
      <h1 className="text-xl mb-4 font-sans">My TokenList</h1>
      <div className=" max-h-60 overflow-y-auto">
        <table className="min-w-full bg-transparent border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {/* <th className="py-2 px-4 border-b">ID</th> */}
              <th className="py-1 px-4 border-b">Token Symbol</th>
              {/* <th className="py-2 px-4 border-b">Price ($)</th> */}
              <th className="py-1 px-4 border-b">amount</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={2} className=" text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : filteredTokens.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={2} className=" text-center">
                  No tokens available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredTokens.map((item) => (
                <tr key={item.address} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item.symbol}</td>
                  <td className="py-2 px-4 border-b">{item.balance}</td>{" "}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TokenList;
