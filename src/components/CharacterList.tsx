import React from 'react'
import { AllCharacter, Character, CharacterArray, Info } from '../App'
import character, { fetchPageThunk, fetchTransmitList, setEisodeInitial } from '../modules/character';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
    readonly characters: CharacterArray; // 🔥
    readonly isLoading: boolean;
    readonly info: Info;
}

const CharacterList = ({characters,info, isLoading}: Props) =>
 {

    const dispatch: Dispatch<any> = useDispatch();

  return (
    <>
    <h2>목록</h2>
    {isLoading && "로딩중..."}
    {console.log(isLoading)}
    {!isLoading && characters && (
        console.log(characters, info)
    )}
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
    {!isLoading &&  
        <ul className="character">
            {characters.map((el)=> 
            <li className="character-item" key={el.id}>
                <Link to={`/character/${el.id}`} 
                    onClick={() => {
                        dispatch(fetchTransmitList(el.id % 20));
                        console.log("test~");
                        
                        dispatch(setEisodeInitial());
                }}>
                <p className="character-item__name">{el.name}</p>
                <p className="character-item__status">{el.status}</p>
                <img className="character-item__image" src={el.image}></img>
                </Link>
            </li>
        )}
        </ul>
    }

    </>
  )
}

export default CharacterList