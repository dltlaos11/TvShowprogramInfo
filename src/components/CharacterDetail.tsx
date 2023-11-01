import { Character, Episode } from '../App';
import { Outlet,  } from 'react-router-dom';


interface Props {
    readonly id: string | undefined;
    readonly character?: Character;
    readonly isLoading: boolean;
    readonly episode: Episode;
  }

const CharacterDetail =({
    id,
    character,
    isLoading,
    episode
}: Props) => {
  const referrer = document.referrer;




  return (
    <>
    {console.log(character, episode)}
    
    {/* 버튼, 이동버튼 컴포넌트화 
        상세페이지는 fb, 전체적인 것은 redux에서
    */}
    <h2>상세 항목</h2>
    {isLoading && "로딩중..."}
    {!isLoading &&  
        <ul className="character-detail">
            <p className="character-detail__name">{character?.name}</p>
            <p className="character-detail__status">{character?.status}</p>
            <p className="character-detail__species">{character?.species}</p>
            <p className="character-detail__type">{character?.type}</p>
            <p className="character-detail__gender">{character?.gender}</p>
            <img className="character-detail__image" src={character?.image}></img>
        </ul>
}
    {/* 타입가드 */}
    {!isLoading && typeof(episode['episode']) === 'object' &&
            episode['episode'].map((el) => 
            <li className="character-detail__episode">{el}</li>
            )
    }
{console.log(referrer.slice())}    
        <div>
            <Outlet />
            
        </div>
    
    </>
  )
}

export default CharacterDetail