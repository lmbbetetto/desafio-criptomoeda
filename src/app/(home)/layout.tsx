import { CoinsProvider } from "@/context/CoinsContext/CoinsProvider";
import { MenuBar } from "@/components/menu-bar";
import { LayoutProps } from "@/utils/types";
import type { ReactElement } from "react";

export default function HomeLayout({ children }: LayoutProps): ReactElement {
  return (
    <>
      <MenuBar />
      <CoinsProvider>{children}</CoinsProvider>
    </>
  );
}
