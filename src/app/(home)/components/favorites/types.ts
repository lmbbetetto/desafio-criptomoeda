import { CoinsFormattedProps } from "@/services";

export type Favorite = {
  createdAt: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  coinImage: string;
};

export type Props = {
  favorites: Favorite[];
  setSelectedCoin: (coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
  }) => void;
  setSelected: (symbol: string) => void;
  setOpen: (open: boolean) => void;
  toggleFavorite: (coin: CoinsFormattedProps) => Promise<void>;
};
