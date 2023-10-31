import styled from 'styled-components';
import { AllCharacter } from '../../modules/character';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';



const AddBookMarkBtn = () => {

    const selectCharacterData = (state: AllCharacter) => ({
        episode: state.episode,
        character: state.character,
      });
  
      const selectCharacter = createSelector(
        [selectCharacterData],
        (data) => data
      );
  
      const { character,  episode } = useSelector(selectCharacter);

    const AddBookMarkBtn = styled.button`
    user-select: none;
    transition: opacity 700ms ease 0s, color 700ms ease 0s, transform 200ms ease 0s;
    cursor: pointer;
    opacity: 1;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    bottom: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    font-size: 20px;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
    z-index: 111;
    transform: translateX(0px) translateZ(0px);

    &:hover {
        background: rgb(239, 239, 238); // 호버 시 색상 변경
      }
`
      const addBookMark = async() => {
        alert('북마크 추가 성공');
        await addDoc(collection(db, "bookmark"), {
            episode: episode.episode,
            image: character.image,
            name: character.name,
            species: character.species,
            status: character.status,
            gender: character.gender,
            id: character.id,
            type: character.type
          });
      }
  return (
    <AddBookMarkBtn onClick={() =>{
        console.log(character, episode.episode);
        addBookMark()
    }
    }>+</AddBookMarkBtn>
  )
}

export default AddBookMarkBtn
