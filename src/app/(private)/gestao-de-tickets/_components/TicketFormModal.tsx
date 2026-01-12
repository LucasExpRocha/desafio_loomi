"use client";

import { AppToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { ticketSchema, TicketSchema } from "@/validation/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type Mode = "create" | "view";

type Props = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function TicketFormModal({
  open,
  mode,
  onClose,
  onSave,
}: Props) {
  const [isPrioridadeOpen, setIsPrioridadeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TicketSchema>({
    defaultValues: {
      priority: "Urgente",
      client: "",
      email: "",
      subject: "",
      status: "Aberto",
      responsible: "",
    },
    mode: "onChange",
    resolver: zodResolver(ticketSchema),
  });

  type Priority = TicketSchema["priority"];

  const priorities = useMemo<Priority[]>(
    () => ["Urgente", "Média", "Baixa"],
    []
  );

  const priority = watch("priority");

  const onSubmit = handleSubmit(async () => {
    await onSave();
    AppToast("success", "Ticket salvo!", "O ticket foi salvo com sucesso.");
  });

  if (!open) return null;

  const isView = mode === "view";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      className="fixed inset-0 z-50 flex-center text-white flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 rounded-4xl bg-background shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-8 pt-8">
          <h3
            id="ticket-modal-title"
            className="font-space-grotesk font-normal font-size-4xl"
          >
            {isView ? "Visualizar Ticket" : "Novo Ticket"}
          </h3>

          <button
            aria-label="Fechar"
            onClick={onClose}
            type="button"
            className="cursor-pointer"
          >
            <XCircle strokeWidth={0.75} className="w-12 h-12" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4"
          aria-label="Formulário de ticket"
        >
          <div className="px-8 pt-6 pb-2 space-y-4">
            <div className="space-y-2">
              <p className="font-inter font-size-sm font-normal text-primary-color ">
                Preencha os dados abaixo para registrar um novo ticket na
                plataforma.
              </p>
              <label className="label-new-ticket">Nome do cliente</label>
              <input
                disabled={isView}
                {...register("client")}
                placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
                className="input-new-ticket"
              />
            </div>

            <div className="space-y-2">
              <label className="label-new-ticket">Email</label>
              <input
                disabled={isView}
                type="email"
                {...register("email")}
                placeholder="E-mail de contato para atualizações e resposta"
                className="input-new-ticket"
              />
            </div>

            <div className="space-y-2">
              <label className="label-new-ticket">Prioridade</label>
              <div className="relative">
                <button
                  type="button"
                  disabled={isView}
                  onClick={() =>
                    !isView && setIsPrioridadeOpen((prev) => !prev)
                  }
                  className="input-new-ticket flex items-center justify-between disabled:opacity-50"
                >
                  <span>{priority}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isPrioridadeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isPrioridadeOpen && !isView && (
                  <div className="absolute z-10 mt-1 w-full rounded-xl bg-[#171d30] border border-white/[0.1] overflow-hidden">
                    {priorities.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setValue("priority", p, { shouldValidate: true });
                          setIsPrioridadeOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-left hover:bg-accent"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-new-ticket">Responsável</label>
              <input
                disabled={isView}
                {...register("responsible")}
                placeholder="Quem será o responsável por esse ticket"
                className="input-new-ticket"
              />
            </div>

            <div className="space-y-2">
              <label className="label-new-ticket">Assunto</label>
              <textarea
                disabled={isView}
                {...register("subject")}
                placeholder="Resumo breve do problema ou solicitação"
                className="input-new-ticket"
                rows={4}
              />
            </div>
          </div>

          <div className="flex flex-center justify-center gap-3 px-8 pb-8">
            <button
              type="button"
              onClick={onClose}
              className="w-32 h-14 border border-[#D9D9D9] rounded-[1.25rem]"
            >
              <span className="font-space-grotesk font-medium font-size-sm text-primary-color">
                {isView ? "Fechar" : "Cancelar"}
              </span>
            </button>

            {!isView && (
              <button
                type="submit"
                className={cn(
                  "inline-flex items-center justify-center rounded-[1.25rem] p-3 w-32 h-14",
                  "font-semibold cursor-pointer text-white text-center align-middle font-size-lg font-space-grotesk tracking-[0.13px] bg-[#1876D2]",
                  "bg-[linear-gradient(0deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.05)),_linear-gradient(35.22deg,_rgba(255,255,255,0.1)_33.61%,_#FFFFFF_89.19%)] backdrop-blur-xl shadow-[0px_12.72px_12.72px_0px_#0000001A,0px_5.09px_5.09px_0px_#0000000D,0px_1.27px_0px_0px_#0000000D] border-[1.27px] border-solid border-white/20"
                )}
              >
                <span className="font-space-grotesk font-medium font-size-sm text-primary-color">
                  Salvar
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
