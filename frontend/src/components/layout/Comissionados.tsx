import { ArcElement, Chart } from "chart.js";
import { Button, Card, Elevation, Icon, Tooltip, Colors, Position } from "@blueprintjs/core";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";

Chart.register(ArcElement);

export interface ComissionadosProps {
  cod_ibge?: number;
  populacao?: number | null;
  servidores?: number | null;
  comissionados?: number | null;
  colaboradores_comissionados_bruto?: number | null;
}

export const Comissionados = ({
  colaboradores_comissionados_bruto,
  populacao,
  servidores,
  comissionados,
}: ComissionadosProps) => {
  const [clampedValue, setClampedValue] = useState(0);

  useEffect(() => {
    const rawValue = Number(colaboradores_comissionados_bruto) || 0;
    setClampedValue(Math.min(Math.max(rawValue, 0), 100));
  }, [colaboradores_comissionados_bruto]);

  const chartData = {
    datasets: [
      {
        data: [clampedValue, 100 - clampedValue],
        backgroundColor: [Colors.BLUE3, Colors.LIGHT_GRAY3],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: { duration: 1000 },
    maintainAspectRatio: false,
    cutout: "75%",
  };

  const formatValue = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return value.toLocaleString("pt-BR");
  };

  return (
    <Card elevation={Elevation.ONE} interactive={true} className="flex flex-col justify-between h-96">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="bp5-heading">Servidores e Comissionados</h3>
          <Tooltip
            content={
              <div className="p-2">
                <p className="mb-2">Razão: Comissionados/Servidores</p>
                <p className="mb-2">Dados de População: IBGE/2025</p>
                <p>Dados de Servidores: IBGE - Munic/2023</p>
              </div>
            }
          >
            <Icon icon="info-sign" className="cursor-pointer" />
          </Tooltip>
        </div>

        <div className="relative h-48 mt-4">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bp5-heading text-2xl">
              {clampedValue.toFixed(2).replace('.', ',')}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-2 flex justify-end">
        <Tooltip
          content={
            <div className="p-2">
              <p>População: {formatValue(populacao)}</p>
              <p>Servidores: {formatValue(servidores)}</p>
              <p>Comissionados: {formatValue(comissionados)}</p>
            </div>
          }
          position={Position.RIGHT}
        >
          <Button text="Detalhes" minimal />
        </Tooltip>
      </div>
    </Card>
  );
};