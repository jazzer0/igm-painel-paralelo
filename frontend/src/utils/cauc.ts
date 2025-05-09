import { LegendaCauc } from "../types/capagEndpoints";

export type CaucCriteria = {
  main: LegendaCauc;
  subItems: LegendaCauc[];
};

export const organizeCaucCriteria = (
  legenda: LegendaCauc[]
): CaucCriteria[] => {
  const mainCriteria = legenda.filter((l) =>
    ["I", "II", "III", "IV", "V"].includes(l.codigo_item)
  );

  return mainCriteria.map((main) => ({
    main,
    subItems: legenda.filter((l) =>
      l.codigo_item.startsWith(
        main.codigo_item === "I" ? "1_" : `${main.codigo_item}_`
      )
    ),
  }));
};
