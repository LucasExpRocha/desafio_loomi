import CardsHeader from "./_components/CardsHeader";
import ListaTickets from "./_components/ListaTickets";

export default function GestaoDeTickets() {
  return (
    <div className="flex flex-col gap-4 2xl:gap-6">
      <CardsHeader />
      <ListaTickets />
    </div>
  );
}
