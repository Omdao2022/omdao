import React, { useState } from "react";

interface TokenHoldingInfo {
  id: number;
  name: string;
  price: number;
  amount: string;
}

const fashionItems: TokenHoldingInfo[] = [
  { id: 1, name: "OmDao", price: 120, amount: "40000" },
  { id: 2, name: "Serum", price: 30, amount: "2000" },
  { id: 3, name: "Metal", price: 200, amount: "3000" },
];

const TokenList: React.FC = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const sortedItems = [...fashionItems].sort((a, b) => {
    const comparison = a.price - b.price;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(fashionItems.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TokenList</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
        >
          Sort by Price: {sortDirection === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price ($)</th>
            <th className="py-2 px-4 border-b">amount</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TokenList;
