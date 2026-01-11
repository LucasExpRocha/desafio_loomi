'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';

const listNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '/svgs/dashboard.svg',
    href: '/dashboard',
  },
  {
    id: 'ticket',
    label: 'Ticket',
    icon: '/svgs/ticket.svg',
    href: '/gestao-de-tickets',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: '/svgs/chat.svg',
    href: '/chat-assistente-virtual',
  },
  {
    id: 'users',
    label: 'Users',
    icon: '/svgs/profile.svg',
    href: '#',
    disabled: true,
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: '/svgs/plan.svg',
    href: '/simulador-de-planos'
  },
]

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    console.log('Logout');
    router.push('/');
  }

  return (
    <aside
      className={cn(
        "h-screen flex flex-col justify-between items-center",
        "pt-5 xl:pt-7 2xl:pt-9",
        "pl-6 xl:pl-8 2xl:pl-10",
        "pr-6 xl:pr-8 2xl:pr-[46px]",
        "pb-12 xl:pb-16 2xl:pb-20",
        "bg-secondary-background shadow-[4px_0px_20px_0px_#00000033] rounded-e-4xl fixed z-20",
        "transform transition-transform duration-300 ease-in-out",
      )}
    >
      <div className="flex flex-col items-center justify-between gap-6 h-full ">
        <div aria-hidden="true" className="flex-center">
          <Image
            src="/svgs/nortusIcon.svg"
            alt="Nortus"
            width={40}
            height={40}
          />
        </div>

        <nav aria-label="Navegação">
          <ul className="flex flex-col items-center gap-6">
            {listNavigation.map((item) => {
              const isActive = item.href === pathname;

              return (
                <li key={item.id} className="list-none">
                  <Link href={item.href} passHref prefetch>
                    <div
                      className={cn(
                        "flex justify-center align-center m-auto",
                        "w-14 h-[52px] xl:w-16 xl:h-[60px] rounded-2xl",
                        "bg-button text-white",
                        "cursor-pointer transition-colors duration-300 ease-in-out",
                        isActive ? "bg-button-active" : "bg-button",
                        item.disabled ? "cursor-not-allowed" : "cursor-pointer",
                      )}
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={24}
                        height={24}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pb-2">
          <button
            onClick={handleLogout}
            className={cn(
              "w-14 h-14 xl:w-16 xl:h-16",
              "rounded-full bg-[var(--background-button-active)] cursor-pointer",
              "font-montserrat font-size-lg text-white"
            )}
          >
            <span>AC</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
