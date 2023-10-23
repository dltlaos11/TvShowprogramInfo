import { Episode, EpisodeArray, Info } from '../App';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import Modal from 'react-modal';
import EpisodeModal from './EpisodeModal';
import { collection, addDoc, getDocs, DocumentData, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { setEpisodeModal, setEpisodeName } from '../modules/character';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | null;

interface Props {
    readonly episodes: EpisodeArray; // 🔥
    readonly isLoading: boolean;
    readonly info: Info;
    readonly airDate: string[]
    readonly episodeModal: Episode;
    readonly modalList: {
      name: string;
      episode: string;
  }[];
}

const EpisodeCalendar = ({episodes,isLoading,info,airDate, episodeModal, modalList }: Props) => {

        const uniqueId = useId();
        const dateObjects: Date[] = airDate.map((dateString) => new Date(dateString))

        const minDate: Date = new Date(Math.min(...dateObjects.map(date => date.getTime())));
        const maxDate: Date = new Date(Math.max(...dateObjects.map(date => date.getTime())));
        const [value, onChange] = useState<ValuePiece|[ValuePiece,ValuePiece]>(new Date());
        // const activeDate = moment(value).format('YYYY-MM-DD');
        const dispatch: Dispatch<any> = useDispatch();

        const [isModalOpen, setModalOpen] = useState(false);
        const [modalContent, setModalContent] = useState('');

        const openModal = (content: any) => {
          setModalContent(content);
          setModalOpen(true);
        }
      
        const closeModal = () => {
          setModalContent('');
          setModalOpen(false);
        }

        const addBookMark =  async () => {
          // setModalContent('');
          // 데이터 추가 (id는 자동 생성됨)
          if (modalList.find((x) => x.episode === episodeModal.episode)){
            alert('이미 추가한 북마크입니다')
          }
          else {
            await addDoc(collection(db, "info"), {
              episode: episodeModal.episode,
              name: episodeModal.name
            });
            alert('북마크 추가 완료');
          }

          // const querySnapshot = await getDocs(collection(db, "info"))
          // querySnapshot.forEach((doc) => {
          //   // 가져온 모든 문서들을 확인
          //   console.log(doc.id, " => ", doc.data(), "??");
          //   // console.log(episodeModal);
          // });
          setModalOpen(false);
        }

        const modalComponent = useMemo(() => {
          return (
            <EpisodeModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              modalContent={modalContent}
              addBookMark={addBookMark}
            />
          );
        }, [isModalOpen, closeModal, modalContent]);

        const [searchTerm, setSearchTerm] = useState('');

        const handleInputChange = useCallback(((e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setSearchTerm(newValue);
        }),[searchTerm]);

        const handleSearch = () => {
          console.log(searchTerm);

          const infoCollectionRef = collection(db, "info"); // "info" 컬렉션 참조

          // "episode" 필드의 값이 "S05E08"인 문서를 찾기 위한 쿼리
          const q = query(infoCollectionRef, where("name", "==", searchTerm));

          // 쿼리 실행
          getDocs(q)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
              alert(`${doc.data().name}`)
                console.log(doc.id, " => ", doc.data());
              });
            })
            .catch((error) => {
              alert('없다 그런 이름')
              console.log("Error getting documents: ", error);
            });

        }


  return (
    <>
    {modalComponent}
    <EpisodeModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        addBookMark={addBookMark}
        modalContent={modalContent} />

        <Calendar 
        onChange={(value, event) => {
          // alert(`New date is: , ${value}`)
          
          const findDay = episodes.find((el) => 
          new Date(el.air_date).toString().slice(0,15) === value?.toString().slice(0,15)
          );

          if(findDay) {
            openModal(`${findDay.episode}, ${findDay.name}`);
            dispatch(setEpisodeModal(findDay.episode as string));
            dispatch(setEpisodeName(findDay.name))
            // alert(`${findDay.episode}, ${findDay.name}`)
          } else{
            // openModal('해당하는 episode ❌');
            alert('해당하는 episode ❌')
          }
          
        }} 
        value={value} 
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (airDate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
             <>
                 <div className="dot"></div>
             </>
           );
          }
        }}

        // selectRange={true}

        maxDate={maxDate} // will not allow date later than today
        minDate={minDate} // will not allow date before 1st July 2015
        showNeighboringMonth={false}
        // minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        // maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
         formatDay={(locale, date) => moment(date).format("DD")}
        />
        {console.log(modalList)}

        <div>
  <input
    type="text"
    placeholder="검색어 입력"
    value={searchTerm}
    onChange={handleInputChange}
  />
  <button onClick={handleSearch}>검색</button>
</div>
        
        <div>
          <div className="bottom-container">
            <h2>북마크</h2>
            {modalList?.map((el) => (
            <div key={el.name+el.episode} style={{display:'flex', justifyContent: 'space-between' }}>
              <p>{el.name}</p>
              <p>{el.episode}</p>
            </div>
          ))}
          </div>
        </div>
        {isLoading && "로딩중..."}
        {console.log(isLoading)}
        {!isLoading && episodes && (
            console.log(episodes, info, airDate, minDate, maxDate)
        )}
    </>
  )
}

export default EpisodeCalendar