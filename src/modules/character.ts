import { createReducer } from "typesafe-actions";
import { Character, CharacterArray, Episode, Info } from "../App";
import { createAction } from "redux-actions";
import { fetchCharacterApi, fetchCharacterListApi, fetchCharacterPageApi, fetchEpisoderApi } from "../lib/api";
import { Dispatch } from "redux";

const FETCH = "character/FETCH";
const FETCH_SUCCESS = "character/FETCH_SUCCESS";
const FETCH_EPISODE_SUCCESS ="character/FETCH_EPISODE_SUCCESS";
const SET_EPISODE_INITIAL = "character/SET_EPISODE_INITIAL";
const FETCH_FAILURE = "character/FETCH_FAILURE";

const FETCH_TRANSMIT_LIST= "character/FETCH_TRANSMIT_LIST";
const FETCH_LIST = "character/FETCH_LIST";
const FETCH_LIST_SUCCESS = "character/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "character/FETCH_LIST_FAILURE";

const FETCH_PAGE = "character/FETCH_PAGE";

export const fetchStart = createAction(FETCH);
export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchEpisodeSuccess = createAction(FETCH_EPISODE_SUCCESS, (data: string) => data);
export const setEisodeInitial = createAction(SET_EPISODE_INITIAL);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);

export const fetchTransmitList = createAction(FETCH_TRANSMIT_LIST, (data:number) => data);
export const fetchListStart = createAction(FETCH_LIST);
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data: string) => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err: any) => err);

export const fetchPage = createAction(FETCH_PAGE, (data: string) => data);

export const episodeListThunk = (id: string | null) => async(dispatch: Dispatch) => {
    console.log("go?");
    
    dispatch(fetchStart());
    try {
        const res = await fetchEpisoderApi(id);

        dispatch(fetchEpisodeSuccess(res.data.name));
        // console.log(res.data.name);
        
    }
    catch(e) {
        dispatch(fetchFailure(e));

        throw e;
    }
}

export const detailCharacterThunk = (id:string) => async (dispatch: Dispatch) => {

    console.log("000");
    dispatch(fetchStart());
    try {
        const res = await fetchCharacterApi(id);

        console.log("111");
        
        dispatch(fetchSuccess(res.data));
    } catch(e) {
        console.log("222");

        dispatch(fetchFailure(e));

        throw e;
 }
};

export const fetchPageThunk = (page:string) => async(dispatch: Dispatch) => {
    dispatch(fetchListStart());

    try {
        const res = await fetchCharacterPageApi(page); //
        
        dispatch(fetchListSuccess(res.data));
    } catch(e) {
        dispatch(fetchListFailure(e));

        throw e;
    }
}

export const listCharacterThunk = () => async(dispatch: Dispatch) => {
    dispatch(fetchListStart());

    try {
        const res = await fetchCharacterListApi();
        
        dispatch(fetchListSuccess(res.data));
    } catch(e) {
        dispatch(fetchListFailure(e));

        throw e;
    }
}

export interface CharacterState {
    loading: { FETCH: boolean, FETCH_LIST: boolean};
    character: Character;
    characters: Character;
    error: any;
}

export interface AllCharacter {
    loading: { FETCH: boolean, FETCH_LIST: boolean};
    info: Info;
    characters: CharacterArray;
    character: Character;
    episode: Episode;
    error: any;
}

const initialState: AllCharacter = {
    loading: {
        FETCH: false,
        FETCH_LIST: false
    },
    info: {next: "", pages: 0, prev: ""},
    characters: [{ id: 0, name: '', status: '', species: '', type: '', gender: '', image: '', episode: []}],
    character: { id: 0, name: '', status: '', species: '', type: '', gender: '', image: '', episode: []},
    episode: {episode: []},
    error: null
}

const character = createReducer(
    initialState,
    {
        [FETCH]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: true,
            },
        }),
        [SET_EPISODE_INITIAL]: (state) => ({
            ...state,
            episode: {
                episode: initialState.episode.episode
            }
        }),
        [FETCH_EPISODE_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: false,
            },
            episode: {
                ...state.episode,
                episode: [...state.episode.episode, action.payload]
            }
        }),
        [FETCH_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: false,
            },
            character: action.payload,
        }),
        [FETCH_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH: false,
            },
            error: action.payload,
        }),
        [FETCH_TRANSMIT_LIST]: (state, action) => ({
            ...state, // 이전의 state를 그대로
            character: {...state.characters[action.payload-1]}
        }),
        [FETCH_LIST]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: true,
            },
        }),
        [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: false,
            },
            info: action.payload.info,
            characters: action.payload.results,
        }),
        [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                FETCH_LIST: false,
            },
            error: action.payload,
        }),
    },
);

export default character;