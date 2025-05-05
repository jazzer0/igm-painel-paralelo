import { ArcElement, Chart } from "chart.js";
import { useTheme } from "../../context/ThemeContext";
import { Card, Icon, Popover } from "@blueprintjs/core";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

export const GastoPessoal = ({ percentage }: { percentage: number }) => {
  const { darkMode } = useTheme();
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: darkMode
          ? ["#EF4444", "#DC2626"]
          : ["#374151", "#F3F4F6"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card className={`${darkMode ? "bp5-dark bg-gray-800" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="bp5-heading">Despesa com Pessoal</h3>
        <div className="flex gap-2">
          <Popover
            content={<div className="p-2">Limites constitucionais...</div>}
          >
            <Icon icon="info-sign" className="cursor-pointer" />
          </Popover>
          <Icon icon="more" className="cursor-pointer" />
        </div>
      </div>
      <div className="relative h-40">
        <Doughnut
          data={data}
          options={{
            cutout: "80%",
            rotation: -90,
            circumference: 180,
            plugins: { legend: { display: false } },
            animation: { duration: 2000 },
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </Card>
  );
};
