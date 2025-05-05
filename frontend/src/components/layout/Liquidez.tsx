// src/components/LiquidityCard.tsx
import { Card, Icon, Popover, ProgressBar } from '@blueprintjs/core';
import { useTheme } from '../../context/ThemeContext';

export const Liquidez = ({ liquidez }: { liquidez: number }) => {
  const { darkMode } = useTheme();

  return (
    <Card className={`${darkMode ? 'bp5-dark bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="bp5-heading">Dados de Liquidez do Município</h3>
        <div className="flex gap-2">
          <Popover content={<div className="p-2">Cálculo de liquidez...</div>}>
            <Icon icon="info-sign" className="cursor-pointer" />
          </Popover>
          <Icon icon="more" className="cursor-pointer" />
        </div>
      </div>
      <ProgressBar
        value={liquidez / 100}
        intent={liquidez > 60 ? 'success' : liquidez > 30 ? 'warning' : 'danger'}
        stripes={false}
        className={`${darkMode ? 'bp5-dark' : ''} mb-2 h-3 rounded-full`}
      />
      <div className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <span>Nível atual</span>
        <span>{liquidez}%</span>
      </div>
    </Card>
  );
};