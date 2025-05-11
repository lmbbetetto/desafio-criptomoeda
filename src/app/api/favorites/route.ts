import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import FavoriteCoin from "@/models/Favorites";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { coinId, coinName, coinSymbol, coinImage } = await req.json();

    await connectToDatabase();

    const existing = await FavoriteCoin.findOne({ userId, coinId });

    if (existing) {
      return NextResponse.json(
        { message: "Favorito já existente" },
        { status: 200 }
      );
    }

    const favorite = new FavoriteCoin({
      userId,
      coinId,
      coinName,
      coinSymbol,
      coinImage,
    });

    await favorite.save();

    return NextResponse.json({ message: "Favorito salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar favorito:", error);
    return NextResponse.json(
      { error: "Erro ao salvar favorito" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const favorites = await FavoriteCoin.find({ userId });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar favoritos" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { coinId } = await req.json();

    if (!coinId) {
      return NextResponse.json(
        { error: "Moeda não fornecida" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const result = await FavoriteCoin.deleteOne({ userId, coinId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Favorito não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Favorito removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return NextResponse.json(
      { error: "Erro ao remover favorito" },
      { status: 500 }
    );
  }
}
