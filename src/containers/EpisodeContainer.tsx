import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AllCharacter, fetchPageThunk, listEpisodeThunk, setEisodeInitial } from '../modules/character';
import { createSelector } from 'reselect';
import Episode from '../components/EpisodeCalendar';
import { db } from '../../firebase';
import { collection, query, where, getDocs, DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import EpisodeCalendar from '../components/EpisodeCalendar';

const EpisodeContainer = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const selectEpisodeListData = (state: AllCharacter) => ({
    episodeModal: state.episode,
    episodes: state.episodes,
    info: state.info,
    isLoading: state.loading.FETCH_LIST
});

  const selectEpisodeList = createSelector(
    [selectEpisodeListData],
    (data) => data
  );

  const { episodes, info, isLoading, episodeModal } = useSelector(selectEpisodeList);

  const airDate: string[] = [];

  const formData = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const modalList: QuerySnapshot[] = [];

  const [ tasks, setTasks ] = useState<Array<{ name: string; episode: string }>>([])
  const docRef = collection(db, "info");
  
//   const getModalList = async() => {
//     const querySnapshot = await getDocs(collection(db, "info"));
//     modalList = querySnapshot.docs.map((doc) => {doc
//       // modalList.push(doc.data())
//       // console.log(doc.data(), "TEST");
//     })

//     const tasks = querySnapshot.docs.map((doc) => {
//       const data = doc.data();
// // return data compatible with data types specified in the tasks variable i.e title, completed and id
//      return { 
//        title: data.title,
//        completed: data.completed,
//        id: doc.id,
//           }
//         }); 

//     // querySnapshot.forEach((doc) => {
//     //   // 가져온 모든 문서들을 확인
//     //   console.log(doc.id, " => ", doc.data(), "??");
//     // });
//   }


  useEffect(() => {
    console.log("test");
    dispatch(setEisodeInitial())
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=2'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=3'));
    // getModalList();

    if(docRef !== undefined) {
      // onSnapshot so we can get data update real-time
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => {
       const data = doc.data();
// return data compatible with data types specified in the tasks variable i.e title, completed and id
      return { 
        name: data.name,
        episode: data.episode,
           }
         }); 
        setTasks(tasks)              
      });
        return () => {
        unsubscribe();
      };
       }
    

  }, [dispatch])

  return (
    <>
      {console.log(modalList)}
      
      {episodes.map((el) => {
        airDate.push(formData(el.air_date))
      })}
      <EpisodeCalendar
      episodeModal={episodeModal}
       episodes={episodes} airDate={airDate} info={info} isLoading={isLoading} modalList={tasks}/>
    </>
  )
}

export default EpisodeContainer
