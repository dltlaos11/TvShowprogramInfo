import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AllCharacter, fetchPageThunk } from '../../modules/character';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { createSelector } from 'reselect';

const NavCharacterPage = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const selectCharacterListData = (state: AllCharacter) => ({
        info: state.info,
    });

    const selectCharacterList = createSelector(
      [selectCharacterListData],
      (data) => data
    );

    const {  info  } = useSelector(selectCharacterList);
  return (
            <div className="page-container">
                <button className="left-button"  onClick={() => {
                    dispatch(fetchPageThunk(info.prev))
                }}>
                    <AiOutlineArrowLeft/>
                </button>
                <button className="right-button" onClick={() => {
                    dispatch(fetchPageThunk(info.next))
                }} >
                    <AiOutlineArrowRight/>
                </button>
            </div>
  )
}

export default NavCharacterPage