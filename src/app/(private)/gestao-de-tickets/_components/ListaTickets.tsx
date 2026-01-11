"use client";
import { formatDateTime } from "@/lib/formatDateTime";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ListaTickets() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const priorityColors = {
    Urgente: "bg-[#BA1A1A]",
    Média: "bg-[#B5EDFF]",
    Baixa: "bg-[#E0F7FF]",
  };

  const statusColors = {
    Aberto: "bg-[#43D2CB]",
    EmAndamento: "bg-[#D2B843]",
    Resolvido: "bg-green-500",
  };

  const visibleTickets = [
    {
      id: 1,
      ticketId: 12345,
      priority: "Urgente",
      client: "Cliente 1",
      email: "cliente1@example.com",
      subject: "Assunto 1",
      status: "Aberto",
      createdAt: "2023-01-01",
      responsible: "Responsável 1",
    },
    {
      id: 2,
      ticketId: 12346,
      priority: "Média",
      client: "Cliente 2",
      email: "cliente2@example.com",
      subject: "Assunto 2",
      status: "EmAndamento",
      createdAt: "2023-01-02",
      responsible: "Responsável 2",
    },
    {
      id: 3,
      ticketId: 12347,
      priority: "Baixa",
      client: "Cliente 3",
      email: "cliente3@example.com",
      subject: "Assunto 3",
      status: "Resolvido",
      createdAt: "2023-01-03",
      responsible: "Responsável 3",
    },
    {
      id: 4,
      ticketId: 12348,
      priority: "Baixa",
      client: "Cliente 4",
      email: "cliente4@example.com",
      subject: "Assunto 4",
      status: "Resolvido",
      createdAt: "2023-01-04",
      responsible: "Responsável 4",
    },
    {
      id: 5,
      ticketId: 12349,
      priority: "Urgente",
      client: "Cliente 5",
      email: "cliente5@example.com",
      subject: "Assunto 5",
      status: "Aberto",
      createdAt: "2023-01-05",
      responsible: "Responsável 5",
    },
  ];
  return (
    <div className="card gap-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          Lista de Tickets
        </h3>
      </div>

      <div className="items-center gap-2">
        <div className="flex items-center gap-2 2xl:flex-nowrap mb-4">
          <div className="relative flex items-center w-full ">
            <Search className="absolute left-5 w-4 h-4 text-primary-color pointer-events-none" />
            <input
              type={"text"}
              className={cn(
                "w-full pl-[44px] py-2 bg-background rounded-full",
                "font-inter font-size-sm text-primary-color placeholder:text-primary-color",
                "outline-none focus:outline-none focus:ring-0 border-none"
              )}
              onChange={handleChange}
              placeholder={"Buscar por ID, cliente ou assunto..."}
            />
          </div>

          <select className="select-filter">
            <option value="">Todos os status</option>
          </select>
          <select className="select-filter">
            <option value="">Todos os prioridades</option>
          </select>
          <select className="select-filter">
            <option value="">Todos os responsáveis</option>
          </select>
        </div>
        <div className="overflow-x-auto bg-[rgba(255,255,255,.05)] p-6 rounded-2xl mb-4">
          <table className="table-auto min-w-full ">
            <thead>
              <tr className="text-left ">
                <th className="table-header w-[100px]">ID</th>
                <th className="table-header w-12 2xl:w-[100px]">Prioridade</th>
                <th className="table-header w-[200px]">Cliente</th>
                <th className="table-header w-[200px]">Assunto</th>
                <th className="table-header w-12 xl:w-[120px]">Status</th>
                <th className="table-header w-[90px]">Criado em</th>
                <th className="table-header w-[140px]">Responsável</th>
                <th className="table-header w-[140px]">Ações</th>
              </tr>
            </thead>
            <tbody >
              {visibleTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 px-4 text-center">
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                visibleTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-white/10">
                    <td className="py-3 px-4 ">
                      <span className="cell-table-semibold">
                        {ticket.ticketId}
                      </span>
                    </td>
                    <td className="py-3 px-4  cell-table-semibold">
                      <span
                        title={ticket.priority}
                        className={cn(
                          "w-3 h-3 rounded-full p-0 mx-auto block",
                          "2xl:cell-table-pill 2xl:w-auto 2xl:h-auto 2xl:mx-0 2xl:inline-block",
                          priorityColors[
                            ticket.priority as keyof typeof priorityColors
                          ]
                        )}
                      >
                        <span
                          className={cn(
                            "hidden 2xl:inline",
                            ticket.priority === "Urgente"
                              ? ""
                              : "text-[#0B1125]"
                          )}
                        >
                          {ticket.priority}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <p className="cell-table-semibold p-0">
                          {ticket.client}
                        </p>
                        <p className="cell-table-normal p-0">{ticket.email}</p>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block lg:hidden px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {ticket.client} – {ticket.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <span
                          className="cell-table-semibold truncate block"
                          title={ticket.subject}
                        >
                          {ticket.subject}
                        </span>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {ticket.subject}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        title={ticket.status}
                        className={cn(
                          "w-3 h-3 rounded-full p-0 mx-auto block",
                          "xl:cell-table-pill xl:w-auto xl:h-auto xl:mx-0 xl:inline-block",
                          statusColors[
                            ticket.status as keyof typeof statusColors
                          ]
                        )}
                      >
                        <span className="hidden xl:inline">
                          {ticket.status}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-[100px]">
                      <div className="relative group">
                        <span
                          className="cell-table-semibold block"
                          title={formatDateTime(ticket.createdAt)}
                        >
                          {formatDateTime(ticket.createdAt)}
                        </span>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {formatDateTime(ticket.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 cell-table-semibold">
                      {ticket.responsible}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="font-montserrat text-xs font-normal text-white">
                          Visualizar
                        </button>
                        <button className="font-montserrat text-xs font-normal text-white">
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end w-full px-6 h-[48px]">
          <button className="w-[56px]">
            <Image
              src="/svgs/arrowleftfinish.svg"
              alt="Primeira página"
              width={36}
              height={36}
            />
          </button>
          <button className="w-[56px]">
            <Image
              src="/svgs/arrowleft.svg"
              alt="Página anterior"
              width={36}
              height={36}
            />
          </button>

          <span className="font-space-grotesk font-medium text-primary-color text-base w-[78px] text-center">
            {1} de {2}
          </span>

          <button className="w-[56px]">
            <Image
              src="/svgs/arrowright.svg"
              alt="Próxima página"
              width={36}
              height={36}
            />
          </button>
          <button className="w-[56px]">
            <Image
              src="/svgs/arrowrightfinish.svg"
              alt="Última página"
              width={36}
              height={36}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
