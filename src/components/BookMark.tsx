import React, { useEffect, useState } from 'react'
import CharacterList from './CharacterList'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { CharacterArray } from '../App';
import { AllCharacter, fetchTasksList, listCharacterThunk } from '../modules/character';
import { createSelector } from 'reselect';

const BookMark = () => {
    const dispatch: Dispatch<any> = useDispatch();
    // const [ tasks, setTasks ] = useState<Array<{ gender: string,type: string,name: string; episode: [], id: number, species: string,status: string ,image:string  }>>([])
    const [ tasks, setTasks ] = useState<CharacterArray>([])
    const docRef = collection(db, "bookmark");

    const selectCharacterListData = (state: AllCharacter) => ({
        characters: state.characters,
        isLoading: state.loading.FETCH_LIST,
        task: state.tasks
    });

    const selectCharacterList = createSelector(
      [selectCharacterListData],
      (data) => data
    );

    const { characters,  isLoading,  task} = useSelector(selectCharacterList);

    useEffect(() => {

        if(docRef !== undefined) {
          const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
          const tasks = querySnapshot.docs.map((doc) => {
           const data = doc.data();
          return { 
                name: data.name,
                episode: data.episode,
                id: data.id,
                image: data.image,
                species: data.species,
                status: data.status,
                gender: data.gender,
                type: data.type
               }
             }); 
            setTasks(tasks)              
          });
            return () => {
            unsubscribe();

          };

           }
           
        }, [dispatch])
        
    useEffect(() => {
        dispatch(listCharacterThunk(tasks));
        dispatch(fetchTasksList(tasks))
        console.log(tasks, 'test');
    }, [tasks])
    
  return (
    <>
        <div>BookMark</div>
        {console.log(characters,  isLoading)}
        
        {isLoading && "로딩중..."}
        {!isLoading && <CharacterList characters={characters} isLoading={isLoading} task={task} />}
    </>
  )
}

export default BookMark