import { Icon } from '@blueprintjs/core';

export const Cauc = ({ status }: { status: boolean[] }) => {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {status.map((status, index) => (
        <div key={index} className="flex flex-col items-center bp5-card">
          <Icon
            icon={status ? "tick-circle" : "issue"}
            intent={status ? "success" : "danger"}
            size={80}
          />
          <span className="text-xl mt-1">Critério {index + 1}</span>
        </div>
      ))}
    </div>
  );
};