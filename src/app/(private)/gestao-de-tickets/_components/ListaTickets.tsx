"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/formatDateTime";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiPencilSimpleLine } from "react-icons/pi";

const ITEMS_PER_PAGE = 5;

export default function ListaTickets({
  ticketsList,
  isLoading
}: {
  ticketsList?: TicketItem[] | null[];
  isLoading: boolean
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(
    searchParams.get("status") || "Todos os status"
  );
  const [priority, setPriority] = useState(
    searchParams.get("priority") || "Todas as prioridades"
  );
  const [responsible, setResponsible] = useState(
    searchParams.get("responsible") || "Todos os responsáveis"
  );
  const [page, setPage] = useState(1);

  const tickets = useMemo(
    () => (ticketsList?.filter(Boolean) || []) as TicketItem[],
    [ticketsList]
  );

  const statusOptions = useMemo(
    () => ["Todos os status", ...new Set(tickets.map((t) => t.status))],
    [tickets]
  );
  const responsibleOptions = useMemo(
    () => [
      "Todos os responsáveis",
      ...new Set(tickets.map((t) => t.responsible)),
    ],
    [tickets]
  );
  const priorityOptions = useMemo<TicketPriority[]>(
    () => ["Urgente", "Média", "Baixa"],
    []
  );

  const filteredTickets = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (status !== "Todos os status" && ticket.status !== status) {
        return false;
      }

      if (priority !== "Todas as prioridades" && ticket.priority !== priority) {
        return false;
      }

      if (
        responsible !== "Todos os responsáveis" &&
        ticket.responsible !== responsible
      ) {
        return false;
      }

      if (searchTerm) {
        const searchableText = [
          ticket.ticketId,
          ticket.id,
          ticket.client,
          ticket.subject,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [tickets, search, status, priority, responsible]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / ITEMS_PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const showTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) setPage(1);
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) setPage(totalPages);
  };
  const priorityColors = {
    Urgente: "bg-[#BA1A1A]",
    Média: "bg-[#B5EDFF]",
    Baixa: "bg-[#E0F7FF]",
  };

  const statusColors = {
    Aberto: "bg-[#43D2CB]",
    ["Em andamento"]: "bg-[#D2B843]",
    Fechado: "bg-green-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (status !== "Todos os status") params.set("status", status);
      if (priority !== "Todas as prioridades") params.set("priority", priority);
      if (responsible !== "Todos os responsáveis")
        params.set("responsible", responsible);

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status, priority, responsible, pathname, router]);

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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={"Buscar por ID, cliente ou assunto..."}
            />
          </div>

          <select
            className="select-filter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            {statusOptions.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <select
            className="select-filter"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
          >
            {priorityOptions.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <select
            className="select-filter"
            value={responsible}
            onChange={(e) => {
              setResponsible(e.target.value);
              setPage(1);
            }}
          >
            {responsibleOptions.map((responsible) => (
              <option key={responsible} value={responsible}>
                {responsible}
              </option>
            ))}
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
                <th className="table-header w-12 xl:w-[140px]">Status</th>
                <th className="table-header w-[90px]">Criado em</th>
                <th className="table-header w-[140px]">Responsável</th>
                <th className="table-header w-[140px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-8 bg-white/10" />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-20 bg-white/10 rounded-full" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32 bg-white/10" />
                        <Skeleton className="h-3 w-24 bg-white/10" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-40 bg-white/10" />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-24 bg-white/10 rounded-full" />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-24 bg-white/10" />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-28 bg-white/10" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-4">
                        <Skeleton className="h-5 w-12 bg-white/10" />
                        <Skeleton className="h-5 w-12 bg-white/10" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : showTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 px-4 text-center">
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                showTickets.map((ticket) => (
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
                      <div className="flex items-center gap-2 gap-6">
                        <button
                          className="font-montserrat text-xs font-normal text-white flex items-end gap-2 cursor-pointer hover:underline-offset-1"
                          onClick={() => {
                            const params = new URLSearchParams(
                              Array.from(searchParams.entries())
                            );
                            params.set("edit", ticket.id);
                            const url = `${pathname}?${params.toString()}`;
                            router.push(url);
                          }}
                        >
                          Editar{" "}
                          <PiPencilSimpleLine color="#1876D2" size={16} />
                        </button>
                        <button
                          className="font-montserrat text-xs font-normal text-white flex gap-2 cursor-pointer hover:underline-offset-1"
                          onClick={() => {
                            const params = new URLSearchParams(
                              Array.from(searchParams.entries())
                            );
                            params.set("view", ticket.id);
                            const url = `${pathname}?${params.toString()}`;
                            router.push(url);
                          }}
                        >
                          Ver{" "}
                          <MdOutlineKeyboardArrowRight
                            color="#1876D2"
                            size={16}
                          />
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
          <button
            className={cn(
              "w-[56px]",
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer brightness-200"
            )}
            disabled={currentPage === 1}
            onClick={goToFirstPage}
          >
            <Image
              src="/svgs/arrowleftfinish.svg"
              alt="Primeira página"
              width={36}
              height={36}
            />
          </button>
          <button
            className={cn(
              "w-[56px]",
              currentPage > 1
                ? "cursor-pointer brightness-200"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={currentPage <= 1}
            onClick={goToPreviousPage}
          >
            <Image
              src="/svgs/arrowleft.svg"
              alt="Página anterior"
              width={36}
              height={36}
            />
          </button>

          <span className="font-space-grotesk font-medium text-primary-color text-base w-[78px] text-center">
            {currentPage} de {totalPages}
          </span>

          <button
            className={cn(
              "w-[56px] cursor-pointer",
              currentPage < totalPages ? "" : "opacity-25 cursor-not-allowed"
            )}
            disabled={currentPage >= totalPages}
            onClick={goToNextPage}
          >
            <Image
              src="/svgs/arrowright.svg"
              alt="Próxima página"
              width={36}
              height={36}
            />
          </button>
          <button
            className={cn(
              "w-[56px] cursor-pointer",
              currentPage >= totalPages ? "opacity-25 cursor-not-allowed" : ""
            )}
            disabled={currentPage === totalPages}
            onClick={goToLastPage}
          >
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
