import React from 'react'
import SIdeMenu from '../components/SIdeMenu/SIdeMenu'
import BotList from '../components/BotList/BotList'
import BotInformation from '../components/BotInformation/BotInformation';
// import './Pages.css';

const Bot = () => {
  return (
    <div className='d-flex'>
        <SIdeMenu />
        <BotList />
        <BotInformation />
    </div>
  )
}

export default Bot