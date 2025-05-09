import { SelectMunicipio } from "../components/layout/MunicipioSelect";
import {
  Button,
  Card,
  Divider,
  Elevation,
  Icon,
  Spinner,
} from "@blueprintjs/core";
import { GastoPessoal } from "../components/layout/GastoPessoal";
import { Liquidez } from "../components/layout/Liquidez";
import { DividaConsolidada } from "../components/layout/DividaConsolidada";
import { Cauc } from "../components/layout/Cauc";
import { Container } from "../components/layout/Container";
import {
  getAllMunicipios,
  getLiquidezByCodIbge,
  getGastoPessoalByCodIbge,
  getCaucDataByCodIbge,
  getMunicipioByCodIbge,
  getColaboradoresByCodIbge,
  getAllLegendaCauc,
} from "../queries/capagQueries";
import { useQuery } from "@tanstack/react-query";
import { MunicipioBasic } from "../types/capagEndpoints";
import React from "react";
import { useTheme } from "../hooks/useTheme";
import { Comissionados } from "../components/layout/Comissionados";

export const CapagScreen = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [selectedMunicipio, setSelectedMunicipio] =
    React.useState<MunicipioBasic | null>(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["municipiosSelectData"],
    queryFn: getAllMunicipios,
  });

  const listaMunicipios: MunicipioBasic[] = Array.isArray(apiResponse)
    ? apiResponse
    : [];

  const { data: liquidezData, isLoading: isLoadingLiquidez } = useQuery({
    queryKey: ["liquidez", selectedMunicipio?.cod_ibge],
    queryFn: () => getLiquidezByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: gastoPessoalData, isLoading: isLoadingGasto } = useQuery({
    queryKey: ["gasto-pessoal", selectedMunicipio?.cod_ibge],
    queryFn: () => {
      if (!selectedMunicipio) throw new Error("Município não selecionado");
      return getGastoPessoalByCodIbge(selectedMunicipio.cod_ibge);
    },
    enabled: !!selectedMunicipio,
  });

  const { data: caucData, isLoading: isLoadingCauc } = useQuery({
    queryKey: ["cauc", selectedMunicipio?.cod_ibge],
    queryFn: () => getCaucDataByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: colaboradoresData } = useQuery({
    queryKey: ["colaboradores", selectedMunicipio?.cod_ibge],
    queryFn: () => getColaboradoresByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: municipioDetalhes, isLoading: isLoadingDetalhes } = useQuery({
    queryKey: ["municipio-detalhes", selectedMunicipio?.cod_ibge],
    queryFn: () => getMunicipioByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: legendaCaucData } = useQuery({
    queryKey: ["legenda-cauc"],
    queryFn: getAllLegendaCauc,
  });

  /*const { data: dividaData, isLoading: isLoadingDivida } = useQuery({
    queryKey: ['divida', selectedMunicipio?.cod_ibge],
    queryFn: () => getDividaConsolidadaByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: hasRequestedData && !!selectedMunicipio,
  });*/

  const isLoadingAny = isLoadingLiquidez || isLoadingGasto || isLoadingCauc;

  console.log(colaboradoresData);

  return (
    <Container>
      <div
        className={`min-h-screen p-6 ${darkMode ? "bp5-dark" : "bp5-light"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6 justify-center">
            <h1 className="bp5-heading mx-auto">
              Painel de Acompanhamento Fiscal Municipal
            </h1>
            <Icon
              icon={darkMode ? "flash" : "moon"}
              className="cursor-pointer ml-4"
              onClick={toggleTheme}
            />
          </div>
        </div>

        <Divider />

        <div className="mb-6">
          {!showSearch && (
            <Button
              icon="search"
              text="Buscar Município"
              onClick={() => setShowSearch(true)}
              className="mb-4"
            />
          )}

          {showSearch && (
            <div className="animate-fade-in">
              <div className="flex gap-4 mb-4">
                <Button
                  icon="cross"
                  minimal
                  onClick={() => {
                    setShowSearch(false);
                    setSelectedMunicipio(null);
                  }}
                />
                <span className="bp5-heading">Selecione um município</span>
              </div>

              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner size={20} />
                  <span>Carregando Lista de Municípios</span>
                </div>
              ) : (
                <SelectMunicipio
                  municipios={listaMunicipios}
                  selectedMunicipio={selectedMunicipio}
                  onSelect={(municipio) => {
                    setSelectedMunicipio(municipio);
                    setShowSearch(false);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {selectedMunicipio && (
          <>
            <Divider />
            <div className="flex flex-col gap-4 mt-6">
              <h2 className="bp5-heading">
                Dados de {selectedMunicipio.nome} - {selectedMunicipio.UF_sigla}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Microrregião",
                    value: municipioDetalhes?.microrregiao,
                  },
                  {
                    title: "Mesorregião",
                    value: municipioDetalhes?.mesorregiao,
                  },
                  { title: "Estado", value: municipioDetalhes?.UF_sigla },
                  { title: "Região", value: municipioDetalhes?.regiao },
                ].map((item, index) => (
                  <Card
                    key={index}
                    elevation={Elevation.ONE}
                    interactive={true}
                    className="hover:bp5-elevation-4 transition-all"
                  >
                    <h5
                      className={`bp5-heading ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.title}
                    </h5>
                    <p
                      className={`mt-2 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.value || "N/A"}
                    </p>
                  </Card>
                ))}
              </div>

              {isLoadingGasto ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-48">
                      <Spinner className="mt-8" />
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <DividaConsolidada data={[]} />
                    <GastoPessoal {...gastoPessoalData} />
                    <Liquidez {...liquidezData} />
                    <Comissionados {...colaboradoresData} />
                  </div>
                  {/* <Cauc data={caucData} legendaCauc={legendaCaucData || []} /> */}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
