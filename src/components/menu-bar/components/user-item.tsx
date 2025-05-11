"use client";

import Image from "next/image";

export default function UserItem() {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="avatar rounded-full min-h-10 min-w-10 flex items-center justify-center">
        <Image
          src="/criptomoedas.png"
          alt="Logo Projeto CARA"
          width={40}
          height={40}
        />
      </div>
      <div className="grow">
        <span className="font-semibold text-black">Conversor CRYPTO</span>
      </div>
    </div>
  );
}
