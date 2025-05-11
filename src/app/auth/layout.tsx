import { FooterLogin } from "./components/footer";
import { HeaderLogin } from "./components/header";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 antialiased">
          <div className="hidden md:flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground bg-login-background" />
          <div className="flex flex-col items-center justify-center relative bg-gray-100">
            <div className="absolute top-10 left-10 w-[90%]">
              <HeaderLogin />
            </div>
            {children}
            <div className="absolute bottom-10 left-10">
              <FooterLogin />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
