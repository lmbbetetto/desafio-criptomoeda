"use client";

import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Erro no login:", result);
        setErrorMessage(result.error || "Erro ao fazer login");
        return;
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      router.push("/");
    } catch (error) {
      console.error("Erro interno:", error);
      setErrorMessage("Erro interno ao tentar fazer login.");
    }
  };

  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Acessar sistema
          </h1>
          <p className="text-sm text-muted-foreground text-black">
            Acesso ao sistema de conversão
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              E-mail
            </Label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "E-mail é obrigatório" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">
              Senha
            </Label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Senha é obrigatória" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Entrando..." : "Acessar Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
}
