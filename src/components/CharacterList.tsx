import React from 'react'
import { AllCharacter, Character, CharacterArray, Info } from '../App'
import character from '../modules/character';
import { Link } from 'react-router-dom';

interface Props {
    readonly characters: CharacterArray; // 🔥
    readonly isLoading: boolean;
    readonly info: Info;
}

const CharacterList = ({characters,info, isLoading}: Props) =>
 {
  return (
    <>
    <h2>목록</h2>
    {isLoading && "로딩중..."}
    {console.log(isLoading)}

    {!isLoading && characters && (
        console.log(characters, info)
    )}
    {!isLoading &&  
        <ul className="character">
            {characters.map((el)=> 
            <li className="character-item" key={el.id}>
                <Link to={`/character/${el.id}`}>
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