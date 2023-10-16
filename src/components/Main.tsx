import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div style={{display:'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'  }}>

        <Link to={`/character`}>
            <button>캐릭터</button>
        </Link> 

        <Link to={`/episode`}>
            <button>에피소드</button>
        </Link> 

        <div>
            <Outlet />

        </div>
    </div>
    
  )
}

export default Main