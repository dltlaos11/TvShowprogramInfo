import React from 'react'
import { AllCharacter, Character, CharacterArray, Info } from '../App'
import character, { fetchBMKTransmitList, fetchPageThunk, fetchTransmitList, setEisodeInitial } from '../modules/character';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
    readonly characters: CharacterArray; // 🔥
    readonly isLoading: boolean;
    readonly task?: CharacterArray // Bookmark에서 props와 Container에서 props가 다름
}

const CharacterList = ({characters, isLoading, task}: Props) =>
 {

    const dispatch: Dispatch<any> = useDispatch();

  return (
    <>
    {console.log(characters,  isLoading)}
    <h2>목록</h2>
    {isLoading && "로딩중..."}
    {console.log(isLoading)}
    {!isLoading && characters && (
        console.log(characters, )
    )}

    {!isLoading &&  
        <ul className="character">
            {characters.map((el)=> 
            
            <li className="character-item" key={el.id}>
                
                <Link to={`/character/${el.id}`} 
                    onClick={() => {
                        
                        if(characters === task){
                            console.log(task.filter((e) => e.id === el.id));
                            dispatch(fetchBMKTransmitList(el.id))
                            // 북마크에서 보여주는 상세페이지 로직 수정
                            // fireStore와 객체 비교 후, 
                            // 동일한경우 -> 북마크에서 보여주는 상세페이지
                            // 다르다면 -> 캐릭터페이지에서 보여주는 상세페이지

                        }
                        else {
                            dispatch(fetchTransmitList(el.id % 20));
                        }
                        
                        console.log("test~", el.id, characters);
                        console.log(task);
                        
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