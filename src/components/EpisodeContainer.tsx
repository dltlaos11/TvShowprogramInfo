import React, { useEffect } from 'react'
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AllCharacter, fetchPageThunk, listEpisodeThunk, setEisodeInitial } from '../modules/character';
import { createSelector } from 'reselect';
import Episode from './Episode';


const EpisodeContainer = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const selectEpisodeListData = (state: AllCharacter) => ({
    episodes: state.episodes,
    info: state.info,
    isLoading: state.loading.FETCH_LIST
});

  const selectEpisodeList = createSelector(
    [selectEpisodeListData],
    (data) => data
  );

  const { episodes, info, isLoading } = useSelector(selectEpisodeList);

  const airDate: string[] = [];

  const formData = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("test");
    dispatch(setEisodeInitial())
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=2'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=3'));
    

  }, [dispatch])

  return (
    <>
      {/* {console.log(episodes, info, isLoading)} */}
      {episodes.map((el) => {
        airDate.push(formData(el.air_date))
      })}
      <Episode episodes={episodes} airDate={airDate} info={info} isLoading={isLoading}/>
    </>
  )
}

export default EpisodeContainer