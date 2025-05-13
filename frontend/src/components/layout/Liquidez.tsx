import { ArcElement, Chart } from "chart.js";
import {
  Button,
  Card,
  Elevation,
  Tooltip,
  Colors,
  Position,
} from "@blueprintjs/core";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";

Chart.register(ArcElement);

export interface LiquidezProps {
  cod_ibge?: number;
  nome_ibge?: string | null;
  caixa_equivalentes?: number | null;
  restos_pagar?: number | null;
  fiscal_liquidez_bruto?: number | null;
}

export const Liquidez = ({
  fiscal_liquidez_bruto,
  caixa_equivalentes,
  restos_pagar,
}: LiquidezProps) => {
  const [clampedValue, setClampedValue] = useState(0);

  useEffect(() => {
    const rawValue = Number(fiscal_liquidez_bruto) * 100 || 0;
    setClampedValue(Math.min(Math.max(rawValue, 0), 100));
  }, [fiscal_liquidez_bruto]);

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

  return (
    <Card
      elevation={Elevation.ONE}
      interactive={true}
      className="flex flex-col justify-between h-96"
    >
      <div className="relative mt-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="bp5-heading">Liquidez Geral</h3>
          <Tooltip
            position={Position.LEFT}
            usePortal={false}
            hoverOpenDelay={100}
            hoverCloseDelay={200}
            content={
              <div className="p-2">
                <p className="mb-2">
                  Razão: Caixa e Equivalentes/Restos a Pagar
                </p>
                <p>Dados contábeis: FINBRA/Contas Anuais</p>
                <p>Dados contábeis: SICONFI/2024</p>
              </div>
            }
          >
            <Button
              icon="info-sign"
              variant="minimal"
              className="hover:bp5-elevation-2"
            />
          </Tooltip>
        </div>

        <div className="relative h-48 mt-4">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bp5-heading text-2xl">
              {clampedValue.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

        <div className="relative mt-4 flex justify-end">
          <Tooltip
            position={Position.LEFT_BOTTOM}
            usePortal={false}
            hoverOpenDelay={100}
            hoverCloseDelay={200}
            content={
              <div className="p-2">
                <p>
                  Caixa:{" "}
                  {caixa_equivalentes?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) || "N/A"}
                </p>
                <p>
                  Restos a Pagar:{" "}
                  {restos_pagar?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) || "N/A"}
                </p>
              </div>
            }
          >
            <Button
              text="Detalhes"
              variant="minimal"
              className="hover:bp5-elevation-2"
            />
          </Tooltip>
        </div>
    </Card>
  );
};
