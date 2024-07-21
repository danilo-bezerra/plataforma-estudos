import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";

function Header() {
  return (
    <div className="relative min-h-20 p-6 shadow-md bg-white dark:shadow-white/10 dark:bg-neutral-900">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex flex-wrap gap-3 cursor-pointer font-medium text-xl"
        >
          <Cookie className="w-8 h-8" /> Receitas
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
