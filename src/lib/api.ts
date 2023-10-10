import axios from "axios";

export const fetchCharacterApi = (id: number) => axios.get(`https://rickandmortyapi.com/api/character${id}`);

export const fetchCharacterListApi = () => axios.get("https://rickandmortyapi.com/api/character");