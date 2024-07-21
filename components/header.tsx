import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <div className="relative min-h-20 p-6 shadow-md bg-neutral-100 dark:shadow-white/10 dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex flex-wrap gap-3 cursor-pointer font-medium text-xl"
        >
          <Image
            src="/images/icon.png"
            width={128}
            height={128}
            alt="three books"
            className="w-8 h-8"
          />
          Estudos
        </Link>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/conteudos/gestao">Configurações</Link>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Header;
