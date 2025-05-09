import { Button, MenuItem, PopoverPosition } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer, Select } from "@blueprintjs/select";
import { MunicipioBasic } from "../../types/capagEndpoints";

type Props = {
  municipios: MunicipioBasic[];
  selectedMunicipio: MunicipioBasic | null;
  onSelect: (municipio: MunicipioBasic | null) => void;
};

const filtrarMunicipio: ItemPredicate<MunicipioBasic> = (query, municipio) => {
  const normalizedQuery = query.toLowerCase();
  return `${municipio.nome} ${municipio.UF_sigla} ${municipio.cod_ibge}`
    .toLowerCase()
    .includes(normalizedQuery);
};

const renderMunicipio: ItemRenderer<MunicipioBasic> = (
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
      label={municipio.UF_sigla || ""}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={`${municipio.cod_ibge} - ${municipio.nome} - ${municipio.UF_sigla}`}
    />
  );
};

export const SelectMunicipio = ({ municipios, selectedMunicipio, onSelect }: Props) => {

  return (
    <div className="flex flex-col gap-4">
      <div style={{ position: "relative" }}>
        <Select<MunicipioBasic>
          items={municipios}
          fill
          itemPredicate={filtrarMunicipio}
          itemRenderer={renderMunicipio}
          noResults={
            <MenuItem
              disabled={true}
              text="Nenhum resultado encontrado."
              roleStructure="listoption"
            />
          }
          onItemSelect={(item) => onSelect(item)}
          activeItem={selectedMunicipio || undefined}
          popoverProps={{
            position: PopoverPosition.AUTO,
            usePortal: false
          }}
        >
          <Button
            fill
            text={selectedMunicipio ? `${selectedMunicipio.nome} - ${selectedMunicipio.UF_sigla}` : "Selecione um município"}
            endIcon="double-caret-vertical"
          />
        </Select>
      </div>
    </div>
  );
};
