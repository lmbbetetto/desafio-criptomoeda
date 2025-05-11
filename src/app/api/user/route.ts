// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   await connectToDatabase();

//   const { name, email } = await req.json();
//   const user = await User.create({ name, email });

//   return NextResponse.json(user);
// }

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
  await connectToDatabase();

  const name = "Leo";
  const email = "leo@email.com";
  const plainPassword = "12345678";

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Usuário já existe." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword, // Salvar a senha hasheada
  });

  return NextResponse.json({ message: "Usuário criado com sucesso", user });
}

// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function GET() {
//   try {
//     await connectToDatabase();

//     const users = await User.find({});

//     if (!users || users.length === 0) {
//       return NextResponse.json(
//         { message: "Nenhum usuário encontrado." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ users });
//   } catch (error) {
//     console.error("Erro ao listar usuários:", error);
//     return NextResponse.json(
//       { error: "Erro interno ao tentar listar usuários." },
//       { status: 500 }
//     );
//   }
// }
