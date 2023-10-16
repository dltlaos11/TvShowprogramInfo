import axios from "axios";

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
  });

export const fetchEpisoderApi = (id: string | null) => axios.get(`${id}`);

export const fetchCharacterApi = (id: string) => instance.get(`character/${id}`);

export const fetchCharacterPageApi = (page: string) => axios.get(`${page}`);


export const fetchCharacterListApi = () => instance.get("character");
