import { Icon, Tooltip } from '@blueprintjs/core';
import { CaucData, LegendaCauc } from '../../types/capagEndpoints';
import { organizeCaucCriteria } from '../../utils/cauc';

interface CaucProps {
  data?: CaucData;
  legendaCauc?: LegendaCauc[];
}

export const Cauc = ({ data, legendaCauc = [] }: CaucProps) => {
  const criteria = organizeCaucCriteria(legendaCauc);
  const pendencias = data?.pendencias_legenda?.split('; ') || [];
  const pendenciasDetalhadas = data?.pendencias_legenda_individual?.split('; ') || [];

  const getStatus = (mainTitle: string) => !pendencias.includes(mainTitle);

  const getSubPendencias = (subItems: LegendaCauc[]) => 
    subItems.filter(sub => pendenciasDetalhadas.includes(sub.exigencia));

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
      {criteria.map(({ main, subItems }) => {
        const status = getStatus(main.exigencia);
        const subPendencias = getSubPendencias(subItems);

        return (
          <Tooltip
            key={main.id}
            position={"bottom"}
            content={
              <div className="p-2 max-w-xs">
                <strong className="block mb-2">{main.codigo_item} - {main.exigencia}</strong>
                {!status ? (
                  <>
                    <p className="text-red-500 font-bold text-xs mb-1">
                      Exigências pendentes do grupo:
                    </p>
                    <ul className="list-disc pl-4">
                      {subPendencias.map(item => (
                        <li key={item.id} className="text-xs">
                          {item.exigencia}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <span className="text-green-600">Sem pendências</span>
                )}
              </div>
            }
          >
            <div className="flex flex-col items-center p-4 mt-4 bp5-card hover:bp5-elevation-2 transition-all cursor-help">
              <Icon
                icon={status ? "tick-circle" : "issue"}
                intent={status ? "success" : "danger"}
                size={40}
              />
              <div className="text-center mt-1">
                <p className="text-sm font-bold">{main.codigo_item}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {main.exigencia}
                </p>
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};