"use client";

import { TextField } from "@/components/TextField";

import { login } from "@/app/actions/auth-actions";
import Checkbox from "@/components/Checkbox";
import { AppToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { LoginFormData, loginSchema } from "@/validation/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();

  const isBrowser = typeof window !== "undefined";

  const savedEmail =
    isBrowser ? localStorage.getItem("rememberUser") || "" : "";

  const [remember, setRemember] = useState(!!savedEmail)

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: savedEmail,
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);

    if (result?.error) {
      AppToast("warning", result.error);
      setError("root", { message: result.error });
      return;
    }

    if (result?.success) {
      router.push("/dashboard");
    }
  };

  function handleRememberChange(val: boolean) {
    setRemember(val);
    localStorage.setItem("rememberUserChecked", String(val));
    if (val) {
      const email = getValues("email") ?? "";
      localStorage.setItem("rememberUser", email);
    } else {
      localStorage.removeItem("rememberUser");
    }
  }

  useEffect(() => {}, [remember]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Formulário de login">
      <TextField
        isRequired
        label="Usuário"
        error={errors.email?.message}
        {...register("email")}
        defaultValue={getValues("email")}
        subText="Insira o seu e-mail, CPF ou passaporte."
        className="mb-8 text-secondary-color"
        autoFocus
      />

      <TextField
        isRequired
        label="Senha"
        type="password"
        error={errors.password?.message}
        {...register("password")}
        className="mb-5 text-secondary-color"
      />

      <div className="flex items-center justify-between h-16 mb-10">
        <Checkbox
          label="Lembrar meu usuário"
          checked={remember}
          onCheckedChange={handleRememberChange}
        />
        <a
          href="#"
          className="font-size-lg font-space-grotesk text-[#1876D2] hover:text-blue-300 font-medium"
        >
          Esqueci minha senha
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full inline-flex items-center justify-center rounded-[1.25rem] p-3 h-[48px] md:h-[68px]",
          "font-semibold cursor-pointer text-white text-center align-middle font-size-lg font-space-grotesk tracking-[0.13px] bg-[#1876D2]",
          "bg-[linear-gradient(0deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.05)),_linear-gradient(35.22deg,_rgba(255,255,255,0.1)_33.61%,_#FFFFFF_89.19%)] backdrop-blur-xl shadow-[0px_12.72px_12.72px_0px_#0000001A,0px_5.09px_5.09px_0px_#0000000D,0px_1.27px_0px_0px_#0000000D] border-[1.27px] border-solid border-white/20"
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2 text-white">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Entrando...
          </span>
        ) : (
          <span className="font-size-lg font-space-grotesk text-white font-medium">
            Entrar
          </span>
        )}
      </button>
    </form>
  );
}
