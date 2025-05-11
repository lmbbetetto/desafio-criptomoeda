import Image from "next/image";
import LOGO from "../../../../public/criptomoedas.png";

export function HeaderLogin() {
  return (
    <section className="flex justify-between">
      <div className="flex items-center gap-3 text-lg text-foreground">
        <Image src={LOGO} alt="Logo Cripto" height={40} width={40} />
        <span className="font-semibold text-black">Conversor CRYPTO</span>
      </div>
    </section>
  );
}
