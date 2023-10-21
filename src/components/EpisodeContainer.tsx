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

  useEffect(() => {
    console.log("test");
    dispatch(setEisodeInitial())
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=2'));
    dispatch(listEpisodeThunk('https://rickandmortyapi.com/api/episode?page=3'));
    

  }, [dispatch])

  return (
    <>
      {console.log(episodes, info, isLoading)}
      <Episode episodes={episodes} info={info} isLoading={isLoading}/>
    </>
  )
}

export default EpisodeContainer