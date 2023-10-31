import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AddBookMarkBtn from './mover/AddBookMarkBtn'

const Main = () => {
  return (
    <div style={{display:'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'  }}>

        <Link to={`/character`}>
            <button>캐릭터</button>
        </Link> 

        <Link to={`/episode`}>
            <button>에피소드</button>
        </Link>

        <Link to={`/bookmark`}>
          <button>북마크</button>
        </Link>


        <div>
            <Outlet />
            {/* 외부 Outlet -> Nav 표시 */}
            {/* 내부 Oulet -> 해당 컴포넌트에 필요한 내부 컴포넌트 표시*/}
            {/* <AddBookMarkBtn /> */}
        </div>

    </div>
    
  )
}

export default Main