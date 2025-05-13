// src/components/DebtConsolidationCard.tsx
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Card, Icon, Popover, Overlay2 } from '@blueprintjs/core';


Chart.register(CategoryScale, LinearScale, BarElement);

export const DividaConsolidada = ({ data }: { data: number[] }) => {

  const chartData = {
    labels: ['Dívida Consolidada Líquida'],
    datasets: [{
      label: 'Valor (R$)',
      data: [data?.divida || 0],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  return (
    <Card className={'relative'}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="bp5-heading">Dívida Consolidada</h3>
        <div className="flex gap-2">
          <Popover content={<div className="p-2">Metodologia de cálculo...</div>}>
            <Icon icon="info-sign" className="cursor-pointer" />
          </Popover>
          <Icon icon="more" className="cursor-pointer" />
        </div>
      </div>
      <Bar 
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          }
        }}
      />
    </Card>
  );
};