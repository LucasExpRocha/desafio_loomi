import Image from "next/image";

export default function CardsHeader() {
  const list = [
    {
      title: "Tickets Abertos",
      icon: "/svgs/ticketAberto.svg",
      value: 15,
    },
    {
      title: "Em andamento",
      icon: "/svgs/emAndamento.svg",
      value: "8",
    },
    {
      title: "Resolvidos hoje",
      icon: "/svgs/resolvidosHoje.svg",
      value: "12",
    },
    {
      title: "Tempo médio",
      icon: "/svgs/tempoMedio.svg",
      value: "3",
      unit: "h",
    },
  ];
  return (
    <header className="grid grid-cols-4 gap-4 2xl:gap-6 max-md:grid-cols-2 w-full">
      {list.map((metric) => (
        <div className="flex flex-col justify-between gap-8 card w-full" key={metric.title}>
          <h3 className="font-montserrat font-size-sm text-ternary-color">{metric.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-montserrat text-white font-bold font-size-xl">{metric.value}</p>
              <p className="font-montserrat text-white font-bold font-size-xl">{metric.unit}</p>
            </div>
            <Image
              src={metric.icon}
              alt={metric.title}
              width={32}
              height={32}
            />
          </div>
        </div>
      ))}
    </header >
  );
}
