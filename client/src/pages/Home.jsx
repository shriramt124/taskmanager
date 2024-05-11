import React from 'react'
import Sidebar from './../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = ({isHome = false}) => {
  return (
    <div className=''>
        <div className='' >
            <Sidebar />
        </div>
        <div className=''>
            <Outlet />
        </div>
    </div>
  )
}

export default Home