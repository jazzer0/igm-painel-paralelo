import { useQuery } from "@tanstack/react-query"
import { SelectMunicipio } from "../components/select/MunicipioSelect"
import { getMunicipio } from "../queries/ibge_localidades"

export const CapagScreen = () => {
  const {data} = useQuery({queryFn: getMunicipio, queryKey: ["cod_ibge"]})
  console.log(data)
  
  return (
    <div className='flex flex-col gap-4'>
      <div><SelectMunicipio></SelectMunicipio></div>
      <div></div>

    </div>
  )
}