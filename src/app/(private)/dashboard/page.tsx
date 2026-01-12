import EvolucaoKpi from "./_components/EvolucaoKpi";
import MapaClientes from "./_components/MapaClientes";
import TaxaConversao from "./_components/TaxaConversao";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 pr">
      <div className="grid grid-cols-[64fr_36fr] gap-6">
        <EvolucaoKpi />
        <TaxaConversao />
      </div>
      <div>
        <MapaClientes />
      </div>
    </div>
  );
}
