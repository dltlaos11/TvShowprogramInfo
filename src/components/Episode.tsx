import React, { useState } from 'react'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import styled from 'styled-components';


const Episode:React.FC = () => {

    //일단 placeholder 개념으로 기본값을 오늘 날짜로 주었다.
// const [startDate, setStartDate] = useState<Date>(today);
// const [endDate, setEndDate] = useState<Date>(today);

    const StyledDatePicker = styled(DatePicker)`
  width: 122px;
  height: 48px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  padding: 20px;
  background-color: transparent;
  color: #707070;
  position: absolute;
  top: -48px;
  left: 5px;
`;
  return (
    <>
    {/* <div>
    <StyledDatePicker // DatePicker의 styled-component명
      locale={ko} //한글
      dateFormat="yyyy.MM.dd"
      selected={startDate}
      closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
      onChange={(date: Date) => setStartDate(date)}
    />
  </div> */}
  {/* <Dash /> //Dash(-) icon 추가 (react-icons) */}
  {/* <div>
    <StyledDatePicker
      locale={ko} //한글
      dateFormat="yyyy.MM.dd"
      selected={endDate}
      closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
      onChange={(date: Date) => setEndDate(date)}
    />
</div> */}
episode
</>
  )
}

export default Episode