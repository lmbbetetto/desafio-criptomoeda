// import { NextResponse } from "next/server";
// import { jwtVerify, JWTPayload } from "jose";
// import { NextRequest } from "next/server";

// interface UserPayload extends JWTPayload {
//   id: string;
// }

// async function verifyToken(token: string): Promise<UserPayload | null> {
//   try {
//     const secret = process.env.JWT_SECRET;
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(secret)
//     );
//     if (payload && typeof (payload as UserPayload).id === "string") {
//       return payload as UserPayload;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Erro ao verificar o token:", error);
//     return null;
//   }
// }

// export async function middleware(req: NextRequest) {
//   const token =
//     req.cookies.get("token")?.value ||
//     req.headers.get("Authorization")?.split(" ")[1];

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   const user = await verifyToken(token);

//   if (!user) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   const userId = user.id;

//   const response = NextResponse.next();
//   response.headers.set("X-User-Id", userId);

//   return response;
// }

// export const config = {
//   atcher: ["/", "/api/conversion", "/api/favorites"],
// };
