import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { Props } from "./types";

export function Favorites({
  favorites,
  setSelectedCoin,
  setSelected,
  setOpen,
  toggleFavorite,
}: Props) {
  if (favorites.length === 0) return null;

  return (
    <div>
      <h2 className="text-md font-semibold text-black mb-4">Favoritos</h2>
      <div className="flex space-x-4 mb-4">
        {favorites.map((coin) => (
          <div
            key={coin.createdAt}
            className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg text-black"
            onClick={() => {
              setSelectedCoin({
                id: coin.coinId,
                name: coin.coinName,
                symbol: coin.coinSymbol,
                image: coin.coinImage,
              });
              setSelected(coin.coinSymbol);
              setOpen(false);
            }}
          >
            <Image
              src={coin.coinImage}
              alt={coin.coinName}
              width={20}
              height={20}
            />
            <span>
              {coin.coinName} ({coin.coinSymbol.toUpperCase()})
            </span>
            <AiFillStar
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite({
                  id: coin.coinId,
                  name: coin.coinName,
                  symbol: coin.coinSymbol,
                  image: coin.coinImage,
                  currentPrice: 0,
                  fullyDilutedValuation: 0,
                  high24h: 0,
                  lastUpdated: "",
                  low24h: 0,
                  marketCap: 0,
                  marketCapRank: 0,
                  priceChange24h: 0,
                  priceChangePercentage24h: 0,
                });
              }}
              className="w-5 h-5 text-yellow-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
