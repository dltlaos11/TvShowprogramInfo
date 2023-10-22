import { EpisodeArray, Info } from '../App';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
    readonly episodes: EpisodeArray; // 🔥
    readonly isLoading: boolean;
    readonly info: Info;
    readonly airDate: string[]
}

const Episode = ({episodes,isLoading,info,airDate}: Props) => {

        
        const dateObjects: Date[] = airDate.map((dateString) => new Date(dateString))

        const minDate: Date = new Date(Math.min(...dateObjects.map(date => date.getTime())));
        const maxDate: Date = new Date(Math.max(...dateObjects.map(date => date.getTime())));
        const [value, onChange] = useState(minDate);
        const activeDate = moment(value).format('YYYY-MM-DD');
  return (
    <>
        <Calendar 
        onChange={() => onChange} 
        value={activeDate} 
        tileContent={({ date, view }) => {
          if (airDate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
             <>
               <div className="flex justify-center items-center absoluteDiv">
                 <div className="dot"></div>
               </div>
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
        {isLoading && "로딩중..."}
        {console.log(isLoading)}
        {!isLoading && episodes && (
            console.log(episodes, info, airDate, minDate, maxDate)
        )}
    </>
  )
}

export default Episode