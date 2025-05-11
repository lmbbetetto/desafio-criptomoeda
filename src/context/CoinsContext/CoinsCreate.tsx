"use client";

import { CoinProps } from "@/services";
import { createContext } from "react";

interface CoinsContextProps {
  data: CoinProps[] | undefined;
  isLoading: boolean;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
}

export const CoinsContext = createContext<CoinsContextProps>(
  {} as CoinsContextProps
);
