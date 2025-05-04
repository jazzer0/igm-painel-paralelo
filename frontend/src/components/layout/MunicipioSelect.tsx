import { Button, MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer, Select } from "@blueprintjs/select";
import * as React from "react";

export interface Municipio {
  nome: string;
  estado: string;
  cod_ibge: number;
}

const ListaMunicipios: Municipio[] = [
  { nome: "Acrelândia", estado: "AC", cod_ibge: 1 },
  { nome: "Alta Floresta D'Oeste", estado: "AC", cod_ibge: 2 },
].map((f, index) => ({ ...f, rank: index + 1 }));

const filtrarMunicipio: ItemPredicate<Municipio> = (
  query,
  municipio,
  _index,
  exactMatch
) => {
  const normalizedName = municipio.nome.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedName === normalizedQuery;
  } else {
    return (
      `${municipio.estado}. ${normalizedName} ${municipio.cod_ibge}`.indexOf(
        normalizedQuery
      ) >= 0
    );
  }
};

const renderMunicipio: ItemRenderer<Municipio> = (
  municipio,
  { handleClick, handleFocus, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={municipio.cod_ibge}
        label={municipio.estado.toString()}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        text={`${municipio.nome} - ${municipio.estado}`}
      />
  );
};

export const SelectMunicipio = () => {
    const [selectedMunicipio, setSelectedMunicipio] = React.useState<Municipio | undefined>();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Select<Municipio>
          items={ListaMunicipios}
          fill
          itemPredicate={filtrarMunicipio}
          itemRenderer={renderMunicipio}
          noResults={
            <MenuItem
              disabled={true}
              text="No results."
              roleStructure="listoption"
            />
          }
          onItemSelect={setSelectedMunicipio}
        >
          <Button
            fill
            text={selectedMunicipio?.nome ?? "Escolha um município"}
            endIcon="double-caret-vertical"
          />
        </Select>
      </div>
    </div>
  );
};
