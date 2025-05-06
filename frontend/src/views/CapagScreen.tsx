import { useQuery } from "@tanstack/react-query";
import { SelectMunicipio } from "../components/layout/MunicipioSelect";
import { Divider, Icon } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";
import { GastoPessoal } from "../components/layout/GastoPessoal";
import { Liquidez } from "../components/layout/Liquidez";
import { DividaConsolidada } from "../components/layout/DividaConsolidada";
import { Cauc } from "../components/layout/Cauc";
import { Container } from "../components/layout/Container";

export const CapagScreen = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <Container>
      <div
        className={`min-h-screen p-6 ${
          darkMode ? "dark bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6 justify-center">
            <h1
              className={`bp5-heading mx-auto ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Painel de Acompanhamento Fiscal Municipal
            </h1>
          </div>
        </div>
        <Icon
              icon={darkMode ? "flash" : "moon"}
              className="cursor-pointer"
              onClick={toggleTheme}
            />
        <Divider />
        <div>
          <div>
            <SelectMunicipio></SelectMunicipio>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="bp5-heading {{.modifier}}">Dados do Município</h2>
          <div className="flex flex-col gap-4">
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                "Microrregião",
                "Mesorregião",
                "Região Imediata",
                "Estado",
                "Região",
              ].map((title, index) => (
                <div
                  key={index}
                  className={`bp5-card ${darkMode ? "bg-gray-800" : ""}`}
                >
                  <h3
                    className={`bp5-heading ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {title}
                  </h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {/* {data?.estado || "N/A"} */}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Liquidez liquidez={45} />
            <DividaConsolidada data={[65]} />
            <GastoPessoal percentage={46.2} />
          </div>
          <Cauc status={[true, false, true, true, false]} />
        </div>
      </div>
    </Container>
  );
};
