import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterDetail from '../components/CharacterDetail'
import { AllCharacter, detailCharacterThunk } from '../modules/character'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { fetchCharacterApi } from '../lib/api'


const CharacterDetailContainer = () =>{
    const dispatch: Dispatch<any> = useDispatch();
    const {id} = useParams()
    const { character, isLoading } = useSelector((state: AllCharacter) => ({
        character: state.character,
        isLoading: state.loading.FETCH
    }));

    useEffect(() => {
        console.log(typeof(id));
        
        // dispatch(fetchCharacterApi(id))
    }, [dispatch, id])

  return (
    <CharacterDetail 
        id={id}
        character={character}
        isLoading={isLoading}
    />
    
  )
}

export default CharacterDetailContainer