import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterDetail from '../components/CharacterDetail'
import { AllCharacter, detailCharacterThunk, episodeListThunk, setEisodeInitial } from '../modules/character'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { fetchCharacterApi } from '../lib/api'
import { createSelector } from "reselect";
import AddBookMarkBtn from '../components/mover/AddBookMarkBtn'



const CharacterDetailContainer = () =>{
    const dispatch: Dispatch<any> = useDispatch();
    const {id} = useParams() as { id: string }; // type assersion

    // const { character, isLoading, episode } = useSelector((state: AllCharacter) => ({
    //     episode: state.episode,
    //     character: state.character,
    //     isLoading: state.loading.FETCH
    // }));

    const selectCharacterData = (state: AllCharacter) => ({
      episode: state.episode,
      character: state.character,
      isLoading: state.loading.FETCH,
    });

    const selectCharacter = createSelector(
      [selectCharacterData],
      (data) => data
    );

    const { character, isLoading, episode } = useSelector(selectCharacter);

    // 숫자만 남기기 위한 filter 메소드 사용  
    // console.log(character?.episode);

    useEffect(() => {
      console.log(character);


        character?.episode?.map((el) =>
      {
          dispatch(episodeListThunk(el));
   
          console.log(el);
          
        // }
        

      }
    )  
    
      
    // console.log(episode);

    }, [])

  return (
    <>
    
    {character && character?.episode?.[0]?.substring(0,4) === 'http' && 
      <AddBookMarkBtn />}
    <CharacterDetail 
        id={id}
        character={character}
        isLoading={isLoading}
        episode={episode}

    />
    </>

    
  )
}

export default CharacterDetailContainer