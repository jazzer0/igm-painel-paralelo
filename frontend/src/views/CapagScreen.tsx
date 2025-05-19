import { SelectMunicipio } from "../components/layout/MunicipioSelect";
import {
  Button,
  Card,
  Divider,
  Elevation,
  Icon,
  Spinner,
  Tooltip,
} from "@blueprintjs/core";
import { GastoPessoal } from "../components/layout/GastoPessoal";
import { Liquidez } from "../components/layout/Liquidez";
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

  const { data: caucData, isLoading: isLoadingCaucData } = useQuery({
    queryKey: ["cauc", selectedMunicipio?.cod_ibge],
    queryFn: () => getCaucDataByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: colaboradoresData, isLoading: isLoadingColaboradores } =
    useQuery({
      queryKey: ["colaboradores", selectedMunicipio?.cod_ibge],
      queryFn: () => getColaboradoresByCodIbge(selectedMunicipio!.cod_ibge),
      enabled: !!selectedMunicipio,
    });

  const { data: municipioDetalhes, isLoading: isLoadingDetalhes } = useQuery({
    queryKey: ["municipio-detalhes", selectedMunicipio?.cod_ibge],
    queryFn: () => getMunicipioByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: !!selectedMunicipio,
  });

  const { data: legendaCaucData = [], isLoading: isLoadingLegendaCauc } =
    useQuery({
      queryKey: ["legenda-cauc"],
      queryFn: getAllLegendaCauc,
    });

  /*const { data: dividaData, isLoading: isLoadingDivida } = useQuery({
    queryKey: ['divida', selectedMunicipio?.cod_ibge],
    queryFn: () => getDividaConsolidadaByCodIbge(selectedMunicipio!.cod_ibge),
    enabled: hasRequestedData && !!selectedMunicipio,
  });*/

  const isLoadingCauc = isLoadingCaucData || isLoadingLegendaCauc;

  const LoadingWrapper = ({
    isLoading,
    children,
    height = "h-auto",
  }: {
    isLoading: boolean;
    children: React.ReactNode;
    height?: string;
  }) => {
    return isLoading ? (
      <div className={`${height} flex items-center justify-center`}>
        <Spinner size={40} />
      </div>
    ) : (
      <>{children}</>
    );
  };

  console.log(colaboradoresData);

  return (
    <Container>
      <div
        className={`flex-1 flex flex-col ${
          darkMode ? "bp5-dark" : "bp5-light"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="bp5-heading !mb-0">
            Painel de Acompanhamento Fiscal Municipal
          </h1>
          <Icon
            icon={darkMode ? "flash" : "moon"}
            className="cursor-pointer"
            onClick={toggleTheme}
          />
        </div>

        <Divider />

        <div className="mb-4 flex-shrink-0">
          {!showSearch && (
            <Button
              icon="search"
              text="Buscar Município"
              onClick={() => setShowSearch(true)}
              className="w-full md:w-auto"
            />
          )}

          {showSearch && (
            <div className="animate-fade-in">
              <div className="flex gap-4 mb-4">
                <Button
                  icon="cross"
                  variant="minimal"
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
          <div className="flex-1 pb-4">
            <Divider />
            <div className="flex flex-col gap-4 mt-6">
              <h2 className="bp5-heading">
                Dados de {selectedMunicipio.nome} - {selectedMunicipio.UF_sigla}
              </h2>
              <LoadingWrapper isLoading={isLoadingDetalhes}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
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
                      <h5 className={"bp5-heading"}>{item.title}</h5>
                      <p className={"mt-2"}>{item.value || "N/A"}</p>
                    </Card>
                  ))}
                </div>
              </LoadingWrapper>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* <DividaConsolidada data={[]} /> */}
                <LoadingWrapper isLoading={isLoadingLiquidez} height="h-full">
                  <Liquidez {...liquidezData} />
                </LoadingWrapper>

                <LoadingWrapper isLoading={isLoadingGasto} height="h-full">
                  <GastoPessoal {...gastoPessoalData} />
                </LoadingWrapper>

                <LoadingWrapper
                  isLoading={isLoadingColaboradores}
                  height="h-full"
                >
                  <Comissionados {...colaboradoresData} />
                </LoadingWrapper>
              </div>
              <div className="relative mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="bp5-heading !text-lg">CAUC</h3>
                  <Tooltip
                    position="bottom"
                    hoverOpenDelay={100}
                    hoverCloseDelay={200}
                    usePortal={false}
                    content={
                      <div className="p-2">
                        <p className="mb-2">
                        Cadastro de Adimplência de Unidades Gestoras: Siconfi/CAUC
                        </p>
                        <p className="mt-2">
                          Os dados são geridos diariamente e atualizados de acordo com o último lançamento.
                        </p>
                        <p className="mt-2">
                          As exigências do CAUC são separados de acordo com sua categoria de 1-5 e pendências podem ser visualizadas acima do card correspondente.
                        </p>
                      </div>
                    }
                  >
                    <Button
                      icon="info-sign"
                      variant="minimal"
                      className="hover:bp5-elevation-2"
                    />
                  </Tooltip>
                </div>
                <p className="bp5-text-muted !text-sm mb-3">
                  Grupos de Exigências
                </p>
                <LoadingWrapper isLoading={isLoadingCauc} height="h-32">
                  <Cauc data={caucData} legendaCauc={legendaCaucData} />
                </LoadingWrapper>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
