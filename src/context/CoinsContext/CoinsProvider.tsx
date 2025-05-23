"use client";

import { ReactNode, useState } from "react";
import { CoinsContext } from "./CoinsCreate";
import useFetch from "@/hooks/useFetching";
import { CoinProps } from "@/services";

interface CoinsProviderProps {
  children: ReactNode;
}

export const CoinsProvider = ({ children }: CoinsProviderProps) => {
  const [currency, setCurrency] = useState<string>("usd");

  const { data, isFetching: isLoading } = useFetch<CoinProps[]>(
    `coins/markets/?vs_currency=${currency}`
  );

  const contextValue = {
    data,
    setCurrency,
    currency,
    isLoading,
  };

  return (
    <CoinsContext.Provider value={contextValue}>
      {children}
    </CoinsContext.Provider>
  );
};
