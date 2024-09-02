import React, { useState, useEffect } from "react";
import { ETHEREUM_TOKENS } from "../../../shared/constants/blockchain";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
interface TokenHoldingList {
  symbol: string;
  name: string,
  title: string,
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
          name: tokenObj.name,
          title: tokenObj.title,
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
      <div className=" max-h-60 overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-transparent w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr
              className="text-gray-700 uppercase bg-gray-50 dark
            :bg-gray-900 dark:text-gray-400"
            >
              <th className="py-1 px-4 border-b">Project</th>
              {/* <th className="py-2 px-4 border-b">ID</th> */}
              <th className="py-1 px-4 border-b">Token Symbol</th>
              {/* <th className="py-2 px-4 border-b">Price ($)</th> */}
              <th className="py-1 px-4 border-b">amount</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="h-14 text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse"
                >
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : filteredTokens.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="h-14 text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  No tokens available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredTokens.map((item) => (
                <tr
                  key={item.address}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-2 px-4 border-b text-gray-900 whitespace-nowrap dark:text-white">
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-900 whitespace-nowrap dark:text-white">
                    {item.symbol}
                  </td>
                  <td className="py-2 px-4 border-b">{item.balance}</td>
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
