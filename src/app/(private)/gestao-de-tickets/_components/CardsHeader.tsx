import Image from "next/image";

export default function CardsHeader({
  ticketsList,
}: {
  ticketsList?: TicketItem[] | null[];
}) {
  const tickets = (ticketsList?.filter(Boolean) || []) as TicketItem[];

  const open = tickets.filter((ticket) => ticket && ticket.status === "Aberto").length;
  const progress = tickets.filter(
    (ticket) => ticket && ticket.status === "Em andamento"
  ).length;

  const today = new Date();
  const solvedToday = tickets.filter((ticket) => {
    if (ticket && ticket.status !== "Fechado") return false;
    const date = new Date(ticket!.updatedAt);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }).length;

  const closed = tickets.filter((ticket) => ticket && ticket.status === "Fechado");
  const timeAvg = closed.length
    ? Number(
        (
          closed
            .map(
              (ticket) =>
                (new Date(ticket.updatedAt).getTime() -
                  new Date(ticket.createdAt).getTime()) /
                36e5
            )
            .reduce((a, b) => a + b, 0) / closed.length
        ).toFixed(1)
      )
    : 0;
  const list = [
    {
      title: "Tickets Abertos",
      icon: "/svgs/ticketAberto.svg",
      value: open,
    },
    {
      title: "Em andamento",
      icon: "/svgs/emAndamento.svg",
      value: progress,
    },
    {
      title: "Resolvidos hoje",
      icon: "/svgs/resolvidosHoje.svg",
      value: solvedToday,
    },
    {
      title: "Tempo médio",
      icon: "/svgs/tempoMedio.svg",
      value: timeAvg,
      unit: "h",
    },
  ];
  return (
    <header className="grid grid-cols-4 gap-4 2xl:gap-6 max-md:grid-cols-2 w-full">
      {list.map((metric) => (
        <div
          className="flex flex-col justify-between gap-2 3xl:gap-8 card w-full"
          key={metric.title || ""}
        >
          <h3 className="font-montserrat font-size-sm text-ternary-color">
            {metric.title || ""}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-montserrat text-white font-bold font-size-xl">
                {metric.value || 0}
              </p>
              <p className="font-montserrat text-white font-bold font-size-xl">
                {metric.unit || ""}
              </p>
            </div>
            <Image
              src={metric.icon}
              alt={metric.title || ""}
              width={32}
              height={32}
            />
          </div>
        </div>
      ))}
    </header>
  );
}
