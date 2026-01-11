'use client';

import { usePathname } from 'next/navigation';


type HeaderAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type HeaderConfig = {
  title: string;
  action?: HeaderAction;
};

const configs: Record<string, HeaderConfig> = {
  '/dashboard': { title: 'Dashboard' },
  '/gestao-de-tickets': {
    title: 'Gestão de Tickets',
  },
  '/simulador-de-plano': { title: 'Simulador de Planos' },
  '/chat-assistente-virtual': { title: 'Chat & Assistente Virtual' },
};

export default function Header() {
  const pathname = usePathname();
  const cfg = configs[pathname] ?? { title: 'Dashboard' };
  return (
    <header
      className="w-full h-[64px] md:h-[80px] 2xl:h-[88px]  bg-secondary-background flex items-center justify-between px-6 md:px-10 fixed z-10"
    >
      <h1 className="font-montserrat text-ternary-color margin-left-layout font-size-lg font-semibold text-white">
        {cfg.title}
      </h1>
    </header>
  );
}
