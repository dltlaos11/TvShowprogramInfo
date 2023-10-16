import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AllCharacter, CharacterState } from '../modules/character';

import { listCharacterThunk } from '../modules/character';
import CharacterList from '../components/CharacterList';
import { Dispatch } from 'redux';
import { createSelector } from "reselect";


const CharacterListContainer = () => {
    const dispatch: Dispatch<any> = useDispatch();

    // const dispatch = useDispatch();

    // const { characters, info, isLoading } = useSelector((state: AllCharacter) => ({
    //     characters: state.characters,
    //     info: state.info,
    //     isLoading: state.loading.FETCH_LIST
    // }));

    const selectCharacterListData = (state: AllCharacter) => ({
        characters: state.characters,
        info: state.info,
        isLoading: state.loading.FETCH_LIST
    });

    const selectCharacterList = createSelector(
      [selectCharacterListData],
      (data) => data
    );

    const { characters, info, isLoading } = useSelector(selectCharacterList);

    useEffect(() => {
        console.log("how ?");
        
        dispatch(listCharacterThunk());
        
    }, [dispatch])

  return (
    <CharacterList characters={characters} info={info} isLoading={isLoading}></CharacterList>
  )
}

export default CharacterListContainer
// inintialState 확인