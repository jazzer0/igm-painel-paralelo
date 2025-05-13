import { LegendaCauc } from "../types/capagEndpoints";

export type CaucCriteria = {
  main: LegendaCauc;
  subItems: LegendaCauc[];
};

export const organizeCaucCriteria = (
  legenda: LegendaCauc[]
): CaucCriteria[] => {
  const romanToNumber: Record<string, string> = {
    I: "1_",
    II: "2_",
    III: "3_",
    IV: "4_",
    V: "5_",
  };

  const mainCriteria = legenda
    .filter((item) => ["I", "II", "III", "IV", "V"].includes(item.codigo_item))
    .sort((a, b) => a.id - b.id);

  return mainCriteria.map((mainItem) => ({
    main: mainItem,
    subItems: legenda.filter((subItem) =>
      subItem.codigo_item.startsWith(romanToNumber[mainItem.codigo_item])
    ),
  }));
};
