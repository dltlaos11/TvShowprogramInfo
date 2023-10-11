import axios from "axios";

export const fetchCharacterApi = (id: string) => axios.get(`https://rickandmortyapi.com/api/character/${id}`);

export const fetchCharacterListApi = () => axios.get("https://rickandmortyapi.com/api/character");