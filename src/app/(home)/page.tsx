"use client";

import { useCoinsContext } from "@/hooks/useCoins";
import {
  Coin,
  CoinBD,
  CoinsFormattedProps,
  ConversionHistory,
} from "@/services";
import { coinsFormatted } from "@/utils/coinsFormatted";
import * as Label from "@radix-ui/react-label";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { AiOutlineDown } from "react-icons/ai";
import { CryptoService } from "@/services/cripto-service";
import { ConversionHistoryTable } from "./components/conversation-history";
import { Favorites } from "./components/favorites";

export default function CryptoConverter() {
  const [selected, setSelected] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { data, isLoading } = useCoinsContext();
  const [filteredCoins, setFilteredCoins] = useState<CoinsFormattedProps[]>([]);
  const [conversionHistory, setConversionHistory] = useState<
    ConversionHistory[]
  >([]);
  const [favorites, setFavorites] = useState<CoinBD[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [resultBRL, setResultBRL] = useState<number>(0);
  const [resultUSD, setResultUSD] = useState<number>(0);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);

  const usdToBrlRate = 5.0;

  const filterHighMarketCap = useCallback(
    (coinsList: CoinsFormattedProps[]) => {
      const sorted = [...coinsList].sort((a, b) => b.high24h - a.high24h);
      setFilteredCoins(sorted);
    },
    []
  );

  const handleConvert = async () => {
    if (!selected || !amount) return;

    const coin = filteredCoins.find((c) => c.symbol === selected);
    if (!coin) return;

    const coinPriceUSD = coin.high24h;
    const amountNum = parseFloat(amount);
    const resultUSD = amountNum * coinPriceUSD;
    const resultBRL = resultUSD * usdToBrlRate;

    setResultBRL(resultBRL);
    setResultUSD(resultUSD);
    setCoin(selectedCoin);
    setQuantidade(amountNum);

    const newEntry: ConversionHistory = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      crypto: `${coin.name} (${coin.symbol.toUpperCase()})`,
      amount: amountNum,
      resultUSD,
      resultBRL,
    };

    setConversionHistory((prev) => [newEntry, ...prev]);
    setAmount("");
    setSelected("");
    setSelectedCoin(null);

    try {
      await CryptoService.saveConversion({
        amount: amountNum,
        selected: `${coin.name} (${coin.symbol.toUpperCase()})`,
        resultUSD,
        resultBRL,
      });
    } catch (error) {
      console.error("Erro ao salvar conversão:", error);
    }
  };

  const toggleFavorite = async (coin: CoinsFormattedProps) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.coinSymbol === coin.symbol
    );

    if (isFavorite) {
      try {
        await CryptoService.removeFavorite(coin.id);
        setFavorites((prev) =>
          prev.filter((favorite) => favorite.coinId !== coin.id)
        );
      } catch (error) {
        console.error("Erro ao remover favorito:", error);
      }
    } else {
      try {
        await CryptoService.addFavorite(coin);

        const newFavorite: CoinBD = {
          coinId: coin.id,
          coinName: coin.name,
          coinSymbol: coin.symbol,
          coinImage: coin.image,
          userId: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setFavorites((prev) => [...prev, newFavorite]);
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
      }
    }
  };

  const fetchConversionHistory = useCallback(async () => {
    try {
      const data = await CryptoService.fetchConversionHistory();
      setConversionHistory(data);
    } catch (error) {
      console.error("Erro ao carregar o histórico de conversões:", error);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await CryptoService.fetchFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Erro ao carregar os favoritos:", error);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const formatted = coinsFormatted(data);
      filterHighMarketCap(formatted);
    }
    fetchConversionHistory();
    fetchFavorites();
  }, [data, filterHighMarketCap, fetchConversionHistory, fetchFavorites]);

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white p-4 md:p-6 rounded-[0.9rem] shadow-md space-y-4">
          <h1 className="text-lg md:text-xl font-bold text-black">Conversão</h1>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span>Carregando criptomoedas...</span>
            </div>
          ) : (
            <>
              <Favorites
                favorites={favorites}
                setSelectedCoin={setSelectedCoin}
                setSelected={setSelected}
                setOpen={setOpen}
                toggleFavorite={toggleFavorite}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-black">
                    Criptomoeda
                  </label>

                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => !prev)}
                      className="w-full flex justify-between items-center rounded-[0.9rem] h-12 border px-4 py-2 bg-white text-gray-700"
                    >
                      <span className="flex items-center gap-2">
                        {selectedCoin ? (
                          <>
                            <Image
                              src={selectedCoin.image}
                              alt={selectedCoin.name}
                              width={25}
                              height={25}
                            />
                            {selectedCoin.name} (
                            {selectedCoin.symbol.toUpperCase()})
                          </>
                        ) : (
                          "Selecione uma criptomoeda"
                        )}
                      </span>
                      <AiOutlineDown />
                    </button>

                    {open && (
                      <ul className="absolute z-50 bg-white shadow-md rounded-lg mt-2 max-h-64 overflow-y-auto w-full">
                        {filteredCoins.map((coin) => {
                          const isFavorite = favorites.some(
                            (fav) => fav.coinSymbol === coin.symbol
                          );
                          return (
                            <li
                              key={coin.id}
                              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                            >
                              <div
                                className="flex items-center gap-2 cursor-pointer text-black"
                                onClick={() => {
                                  setSelectedCoin(coin);
                                  setSelected(coin.symbol);
                                  setOpen(false);
                                }}
                              >
                                <Image
                                  src={coin.image}
                                  alt={coin.name}
                                  width={25}
                                  height={25}
                                />
                                {coin.name} ({coin.symbol.toUpperCase()})
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(coin);
                                }}
                              >
                                {isFavorite ? (
                                  <AiFillStar
                                    size={25}
                                    className="text-yellow-500"
                                  />
                                ) : (
                                  <CiStar size={25} />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label.Root
                    htmlFor="amount"
                    className="text-sm font-medium text-black"
                  >
                    Quantidade
                  </Label.Root>
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    placeholder="Digite a quantidade"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border rounded-[0.9rem] p-[0.6rem] h-12 placeholder-gray-500 text-gray-700"
                  />
                </div>
              </div>

              <button
                onClick={handleConvert}
                className="bg-blue-600 text-white w-full py-2 rounded-[0.9rem] hover:bg-blue-700 transition opacity-90 cursor-pointer"
              >
                Converter
              </button>
              {resultBRL > 0 ? (
                <div className="flex flex-col items-center p-4 md:p-6 rounded-[0.9rem]">
                  <h2 className="text-md md:text-lg font-semibold text-black mb-4">
                    Última conversão
                  </h2>

                  <div className="flex flex-col items-center gap-2">
                    <p className="text-black font-medium text-center">
                      {coin?.name} ({coin?.symbol.toUpperCase()})
                    </p>
                    <p className="text-black font-medium text-center">
                      {quantidade}
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4 font-semibold">
                      <p className="bg-green-700 text-white w-[15rem] h-12 rounded-[0.9rem] p-2 flex items-center justify-center">
                        Valor (USD): ${" "}
                        {resultUSD.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="bg-green-700 text-white w-[15rem] h-12 rounded-[0.9rem] p-2 flex items-center justify-center">
                        Valor (BRL): R${" "}
                        {resultBRL.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        <ConversionHistoryTable conversionHistory={conversionHistory} />
      </div>
    </main>
  );
}
