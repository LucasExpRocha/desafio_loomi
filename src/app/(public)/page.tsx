import Image from "next/image";
import LoginForm from "./_components/LoginForm";
import { SupportCard } from "./_components/SupportCard";

export default function Login() {

  return (
    <main className="min-h-dvh bg-[#0B1125] text-white flex items-center justify-center px-14 py-6">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 justify-start md:ml-10">
        <section className="flex flex-col justify-start max-w-3xl w-full min-w-80">
          <Image
            src="/svgs/nortus.svg"
            alt="Nortus"
            width={128}
            height={32}
            priority
          />
          <div className="flex flex-col justify-center min-h-full gap-16">
            <div className="flex flex-col gap-2.5">
              <h1 className="font-space-grotesk font-size-4xl leading-11 font-normal text-primary-color">
                Login
              </h1>
              <p className="font-inter font-normal font-size-xl leading-7 tracking-wide text-primary-color">
                Entre com suas credenciais para acessar a sua conta.
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
        <section className="hidden md:flex items-start justify-start min-w-72">
          <div
            className="relative w-full h-[85vh] rounded-[4rem] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background-login.png')" }}
          >
            <SupportCard />
          </div>
        </section>
      </div>
    </main>
  );
}