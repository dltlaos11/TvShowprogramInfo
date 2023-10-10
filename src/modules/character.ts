import { createReducer } from "typesafe-actions";
import { Character, CharacterArray, Info } from "../App";
import { createAction } from "redux-actions";
import { fetchCharacterApi, fetchCharacterListApi } from "../lib/api";
import { Dispatch } from "redux";

const FETCH = "character/FETCH";
const FETCH_SUCCESS = "character/FETCH_SUCCESS";
const FETCH_FAILURE = "character/FETCH_FAILURE";

const FETCH_LIST = "character/FETCH_LIST";
const FETCH_LIST_SUCCESS = "character/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "character/FETCH_LIST_FAILURE";

export const fetchStart = createAction(FETCH);
export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);

export const fetchListStart = createAction(FETCH_LIST);
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data: string) => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err: any) => err);

export const detailCharacterThunk = (id:number) => async (dispatch: Dispatch) => {
    dispatch(fetchStart());
    try {
        const res = await fetchCharacterApi(id);

        console.log(res);
        
        dispatch(fetchSuccess(res.data));
    } catch(e) {
        dispatch(fetchFailure(e));

        throw e;
 }
};

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