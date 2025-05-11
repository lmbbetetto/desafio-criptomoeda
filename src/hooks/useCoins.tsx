import { CoinsContext } from "@/context/CoinsContext/CoinsCreate";
import { useContext } from "react";

export const useCoinsContext = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error("useCoinsContext must be used within a ToolsProvider");
  }
  return context;
};
