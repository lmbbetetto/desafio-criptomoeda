import { CoinBD, CoinsFormattedProps, ConversionHistory } from ".";

export const CryptoService = {
  async addFavorite(coin: CoinsFormattedProps) {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinId: coin.id,
        coinName: coin.name,
        coinSymbol: coin.symbol,
        coinImage: coin.image,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar favorito");
    }
  },

  async removeFavorite(coinId: string) {
    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinId }),
    });

    if (!response.ok) {
      throw new Error("Erro ao remover favorito");
    }
  },

  async fetchFavorites(): Promise<CoinBD[]> {
    const response = await fetch("/api/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
  },

  async fetchConversionHistory(): Promise<ConversionHistory[]> {
    const response = await fetch("/api/conversion", {
      method: "GET",
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
  },

  async saveConversion(data: {
    amount: number;
    selected: string;
    resultUSD: number;
    resultBRL: number;
  }) {
    const response = await fetch("/api/conversion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar conversão");
    }

    return await response.json();
  },
};
