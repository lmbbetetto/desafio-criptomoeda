"use client";
import { LogOut, House } from "lucide-react";
import Link from "next/link";
import UserItem from "./components/user-item";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function MenuBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b z-50 p-4 flex items-center justify-between">
        <UserItem />
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white py-1 px-4 rounded-[0.8rem] h-10 hover:bg-red-900 transition cursor-pointer flex items-center gap-2"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>

      <div className="hidden lg:fixed lg:flex lg:flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4 bg-white">
        <div>
          <UserItem />
        </div>
        <div className="grow text-black">
          <section className="flex flex-col gap-2 mt-2 mb-6">
            <Link href="/">
              <p className="flex gap-2 items-center text-sm hover:cursor-pointer hover:bg-muted p-1 rounded-sm">
                <House size={18} />
                Início
              </p>
            </Link>
          </section>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-700 text-white py-1 px-4 rounded-[0.8rem] h-10 hover:bg-red-900 transition cursor-pointer flex items-center gap-2"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-[64px]" />
    </>
  );
}
