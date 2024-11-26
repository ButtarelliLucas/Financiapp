import React from "react";

const TransactionTable = () => {
  const transactions = [
    {
      amount: "$7,600.00 USD",
      status: "Ingreso",
      tax: "$500.00",
      description: "Ganancias",
      invoice: "#00012",
    },
    {
      amount: "$10,000.00 USD",
      status: "Extracción",
      tax: null,
      description: "Tom Cook - Sueldo",
      invoice: "#00011",
    },
    {
      amount: "$50,000.00 USD",
      status: "Venta",
      tax: "$130.00",
      description: "Ventas",
      invoice: "#00009",
    },
    {
      amount: "$14,000.00 USD",
      status: "Deposito",
      tax: "$900.00",
      description: "Website",
      invoice: "#00010",
    },
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-md border border-gray-700 shadow-md gap-6">
      <h2 className="text-lg font-semibold mb-4">Ultimos movimientos</h2>
      <div className="hidden md:block">
        {/* Desktop View */}
        <table className="w-full text-left bg-white rounded-md">
          <thead>
            <tr className="bg-gray-700 text-gray-100">
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Invoice</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-600 transition-colors"
              >
                <td className="py-2 px-4">{transaction.amount}</td>
                <td
                  className={`py-2 px-4 ${
                    transaction.status === "Ingreso"
                      ? "text-green-500"
                      : transaction.status === "Deposito"
                      ? "text-green-500"
                      : transaction.status === "Extracción"
                      ? "text-red-500"
                      : transaction.status === "Venta"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {transaction.status}
                </td>
                <td className="py-2 px-4">
                  {transaction.description}
                  <span className="block text-sm text-gray-500">
                    {transaction.tax}
                  </span>
                </td>
                <td className="py-2 px-4">{transaction.invoice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
  {/* Mobile View */}
  {transactions.map((transaction, index) => (
    <div
      key={index}
      className="bg-gray-800 rounded-md shadow p-4 mb-4 border border-gray-700"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-white">{transaction.amount}</span>
        <span
          className={`text-sm ${
            transaction.status === "Paid"
              ? "text-green-400"
              : transaction.status === "Overdue"
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {transaction.status}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-300">
        {transaction.description}
      </div>
      {transaction.tax && (
        <div className="text-sm text-gray-500">{transaction.tax}</div>
      )}
      <div className="mt-2 text-sm text-blue-400">
        Invoice {transaction.invoice}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default TransactionTable;
