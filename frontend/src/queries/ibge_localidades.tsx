import axios from "axios"

export const getMunicipio = async () => {
    return await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
}