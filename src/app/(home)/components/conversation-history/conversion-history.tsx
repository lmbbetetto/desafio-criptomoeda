"use client";

import React from "react";
import { ConversionHistoryTableProps } from "./types";

export function ConversionHistoryTable({
  conversionHistory,
}: ConversionHistoryTableProps) {
  if (conversionHistory.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-[0.9rem] shadow-md">
      <h2 className="text-lg font-semibold text-black mb-4">
        Histórico de Conversões
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 text-[1rem]">
            <tr>
              <th className="p-2">Data</th>
              <th className="p-2">Criptomoeda</th>
              <th className="p-2">Quantidade</th>
              <th className="p-2">Valor (USD)</th>
              <th className="p-2">Valor (BRL)</th>
            </tr>
          </thead>
          <tbody>
            {conversionHistory.map((item) => (
              <tr key={item.date} className="border-t text-[1rem]">
                <td className="p-2 text-gray-700">{item.date}</td>
                <td className="p-2 text-gray-700">{item.crypto}</td>
                <td className="p-2 text-gray-700">
                  {item.amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-2 text-gray-700">
                  ${" "}
                  {item.resultUSD.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-2 text-gray-700">
                  R${" "}
                  {item.resultBRL.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
