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
}

const Episode = ({episodes,
    isLoading,
    info}: Props) => {

        const [value, onChange] = useState<Value>(new Date());
        // const [value, onChange] = useState(new Date());
        // const [dateState, setDateState] = useState(new Date())
        // const changeDate = (e: any) => {
        //   setDateState(e)
        // }

  return (
    <>
        {/* <Calendar 
      value={dateState}
      onChange={changeDate}
      /> */}
        <Calendar 
        onChange={() => {console.log(value);}} 
        value={value} 
        
        // nextLabel='month>>'
        // nextAriaLabel='Go to next month'
        // next2Label='year>>'
        // next2AriaLabel='Go to next year'
        // prevLabel='<<month'
        // prevAriaLabel='Go to prev month'
        // prev2Label='<<year'
        // prev2AriaLabel='Go to prev year'

        // selectRange={true}
        maxDate={new Date()} // will not allow date later than today
        minDate={new Date(2015, 6, 1)} // will not allow date before 1st July 2015
        showNeighboringMonth={false}
        // minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        // maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
         formatDay={(locale, date) => moment(date).format("DD")}
        />
        {isLoading && "로딩중..."}
        {console.log(isLoading)}
        {!isLoading && episodes && (
            console.log(episodes, info)
        )}
    </>
  )
}

export default Episode