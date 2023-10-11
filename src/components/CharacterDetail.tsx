import React from 'react'
import { Character } from '../App';

interface Props {
    readonly id: string | undefined;
    readonly character?: Character;
    readonly isLoading: boolean;
  }

function CharacterDetail({
    id,
    character,
    isLoading
}: Props) {
  return (
    <>
    <h2>상세 항목</h2>
    {isLoading && "로딩중..."}
    {!isLoading &&  
        <ul className="character-detail">
            <p className="character-detail__name">{character?.name}</p>
            <p className="character-detail__status">{character?.status}</p>
            <p className="character-detail__species">{character?.species}</p>
            <p className="character-detail__type">{character?.type}</p>
            <p className="character-detail__gender">{character?.gender}</p>
            {/* <span className="character-detail__episode">{character?.episode}</span> */}
            <img className="character-detail__image" src={character?.image}></img>
        </ul>
}
    </>
  )
}

export default CharacterDetail