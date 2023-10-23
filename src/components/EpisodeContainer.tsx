import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AllCharacter, fetchPageThunk, listEpisodeThunk, setEisodeInitial } from '../modules/character';
import { createSelector } from 'reselect';
import Episode from './EpisodeCalendar';
import { db } from '../../firebase';
import { collection, query, where, getDocs, DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import EpisodeCalendar from './EpisodeCalendar';

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

// 북마크 페이지
// 캐릭터 페이지와 동일한 페이지
// 페이지이동 없음 ❌
// 북마크 페이지에서도 캐릭터 페이지 상세페이지 똑같고 다 똑같다
// 캐릭터 상세 페이지 북마크 추가버튼 ,
// 북마크 상세 페이지에서는 추가 ❌, 검색
// 캐릭터에서는 api에서 받고 북마크는 파베
// 파베에서 받는 흐름 api받는 흐름과 유사하게, 코드 재사용성 있는것도 있고 없는것두 있고

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
