import React from 'react';
import './InputBox.css';

const InputBox = ({label, type, onChange, name}) => {
  return (
    <input name={name} className='inputBox' type={type} onChange={onChange} placeholder={label} />
  )
}

export default InputBox