import React from 'react'
import { useEffect } from 'react';
import './BotSkills.css';

const BotSkills = () => {
  useEffect(()=> {
    console.log('skills loaded')
  }, [])
  return (
    <div className='bot_skills_container'>BotSkills</div>
  )
}

export default BotSkills