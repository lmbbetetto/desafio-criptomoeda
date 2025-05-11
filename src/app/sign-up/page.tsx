"use client";

import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
  name: string;
};

export default function SignUp() {
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
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Erro no cadastro:", result);
        setErrorMessage(result.error || "Erro ao cadastrar");
        return;
      }
      toast.success("Cadastro realizado com sucesso!");
      router.push("/auth");
    } catch (error) {
      console.error("Erro interno:", error);
      setErrorMessage("Erro interno ao tentar cadastrar.");
    }
  };

  return (
    <div className="p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Cadastro
          </h1>
          <p className="text-sm text-muted-foreground text-black">
            Cadastre-se no sistema de conversão
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black">
              Nome
            </Label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Nome é obrigatório" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <button
          onClick={() => router.push("/auth")}
          className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-900 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
