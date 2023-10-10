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
    {console.log(id, character, isLoading)} 
    hi
    </>
  )
}

export default CharacterDetail