import { ArcElement, Chart } from "chart.js";
import {
  Button,
  Card,
  Elevation,
  Position,
  Tooltip,
} from "@blueprintjs/core";
import { Doughnut } from "react-chartjs-2";
import { Colors } from "@blueprintjs/core";

Chart.register(ArcElement);

export interface GastoPessoalProps {
  cod_ibge?: number;
  nome_ibge?: string | null;
  despesa_com_pessoal?: number | null;
  receita_corrente_liquida?: number | null;
  fiscal_gasto_pessoal_bruto?: number | null;
}

export const GastoPessoal = ({
  despesa_com_pessoal,
  receita_corrente_liquida,
  fiscal_gasto_pessoal_bruto,
}: GastoPessoalProps) => {
  const min = 30;
  const max = 81;
  const rawValue = Number(fiscal_gasto_pessoal_bruto) * 100;
  const current = rawValue || min;
  const clampedValue = Math.min(Math.max(current, min), max);

  const colors = {
    green: Colors.FOREST3,
    yellow: Colors.GOLD3,
    orange: Colors.ORANGE3,
    red: Colors.VERMILION3,
    text: Colors.DARK_GRAY5,
    pointer: Colors.RED3,
  };

  const backgroundData = {
    datasets: [
      {
        data: [19, 2, 3, 27],
        backgroundColor: [
          colors.green,
          colors.yellow,
          colors.orange,
          colors.red,
        ],
        borderWidth: 0,
      },
    ],
  };

  const graphOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: { duration: 1000 },
    maintainAspectRatio: false,
  };

  const pointerAngle = ((clampedValue - min) / (max - min)) * 180 - 90;

  const getPercentagePosition = (percentage: number) => {
    const angle = ((percentage - min) / (max - min)) * 180 - 90;
    const radius = 72;
    return {
      left: `${50 + Math.cos((angle * Math.PI) / 180) * radius}%`,
      top: `${50 + Math.sin((angle * Math.PI) / 180) * radius}%`,
      transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
    };
  };

  return (
    <Card elevation={Elevation.ONE} interactive={true} className="h-96">
        <div className="flex relative justify-between items-center mb-4">
          <h3 className="bp5-heading">Despesa com Pessoal</h3>
          <Tooltip
            content={
              <div className="p-2">
                <p className="mb-2">
                  Dados de Despesa Total com Pessoal: Contas Anuais
                </p>
                <p className="mb-2">Dados de Receita Corrente Líquida: RREO</p>
                <p>Despesa Total com Pessoal / Receita Corrente Líquida.</p>
                <p className="mt-2">
                  Para verificar os percentuais dos limites da despesa com
                  pessoal de cada esfera e poder, consultar a Seção II da Lei
                  Complementar nº 101/2000.
                </p>
              </div>
            }
            position={Position.LEFT_BOTTOM}
            usePortal={false}
          >
            <Button
              icon="info-sign"
              className="hover:bp5-elevation-2 cursor-pointer"
            />
          </Tooltip>
        </div>

      <div className="relative h-48 mb-8">
        {/* {[30, 49, 51, 54, 81].map((percentage) => (
          <div
            key={percentage}
            className="absolute text-xs -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              ...getPercentagePosition(percentage),
              fontSize: "0.65rem",
              pointerEvents: "none",
            }}
          >
            {percentage}%
          </div>
        ))} */}

        <div className="relative w-full h-full">
          <Doughnut
            data={backgroundData}
            options={{
              ...graphOptions,
              cutout: "60%",
            }}
          />
        </div>

        <div
          className="absolute left-1/2 bottom-0 w-1 h-1/2 origin-bottom"
          style={{
            transform: `rotate(${pointerAngle}deg)`,
            backgroundColor: colors.pointer,
          }}
        />
      </div>

      <div className="text-center mb-6 pt-6">
        <span
          className="bp5-heading mb-0 text-2xl"
          style={{ color: colors.text }}
        >
          {current.toFixed(2)}%
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          {[
            { label: "Abaixo do limite", color: colors.green },
            { label: "Limite do alerta", color: colors.yellow },
            { label: "Limite prudencial", color: colors.orange },
            { label: "Acima do limite", color: colors.red },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600 dark:text-gray-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex justify-end">
        <Tooltip
          content={
            <div className="p-2">
              <p>
                Receita Corrente Líquida:{" "}
                {Number(receita_corrente_liquida)?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "N/A"}
              </p>
              <p>
                Despesa com Pessoal:{" "}
                {Number(despesa_com_pessoal)?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "N/A"}
              </p>
            </div>
          }
          position={Position.LEFT_BOTTOM}
          usePortal={false}
        >
          <Button
            text="Detalhes"
            className="hover:bp5-elevation-2"
          />
        </Tooltip>
      </div>
    </Card>
  );
};
