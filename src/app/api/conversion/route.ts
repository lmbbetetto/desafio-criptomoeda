import { NextRequest, NextResponse } from "next/server";
import ConversionHistory from "../../../models/ConversionHistory";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { amount, selected, resultUSD, resultBRL } = await req.json();

    const data = {
      userId,
      crypto: selected,
      amount,
      resultUSD,
      resultBRL,
      date: new Date().toLocaleString(),
    };

    await connectToDatabase();

    const conversion = new ConversionHistory(data);

    await conversion.save();

    return NextResponse.json({ message: "Conversão salva com sucesso" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar conversão" },
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

    const history = await ConversionHistory.find({ userId }).sort({ date: -1 });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Erro ao buscar histórico de conversões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar histórico de conversões" },
      { status: 500 }
    );
  }
}
