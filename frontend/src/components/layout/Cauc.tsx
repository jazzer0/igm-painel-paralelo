import { Icon, Tooltip } from '@blueprintjs/core';
import { CaucData, LegendaCauc } from '../../types/capagEndpoints';
import { organizeCaucCriteria } from '../../utils/cauc';

interface CaucProps {
  data?: CaucData;
  legendaCauc: LegendaCauc[];
}

export const Cauc = ({ data, legendaCauc }: CaucProps) => {
  const criteria = organizeCaucCriteria(legendaCauc);
  const pendencias = data?.pendencias_legenda?.split('; ') || [];
  const pendenciasDetalhadas = data?.pendencias_legenda_individual?.split('; ') || [];

  const getStatus = (mainTitle: string) => !pendencias.includes(mainTitle);

  const getSubPendencias = (subItems: LegendaCauc[]) => 
    subItems.filter(sub => pendenciasDetalhadas.includes(sub.exigencia));

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {criteria.map(({ main, subItems }) => {
        const status = getStatus(main.exigencia);
        const subPendencias = getSubPendencias(subItems);

        return (
          <Tooltip
            key={main.id}
            content={
              <div className="p-2 max-w-xs">
                <strong className="block mb-2">{main.exigencia}</strong>
                {!status ? (
                  <ul className="list-disc pl-4">
                    {subPendencias.map(item => (
                      <li key={item.id} className="text-xs">{item.exigencia}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-green-600">Sem pendências</span>
                )}
              </div>
            }
          >
            <div className="flex flex-col items-center bp5-card hover:bp5-elevation-2 transition-all p-4 cursor-help">
              <Icon
                icon={status ? "tick-circle" : "issue"}
                intent={status ? "success" : "danger"}
                size={80}
              />
              <span className="text-xl mt-2 font-semibold">{main.codigo_item}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};