import React from 'react'
import "./Input.css"

function Input({type,name, onChange}) {
  
  return (
    <div className='inputs'>
        
   
      <input
      type={ type || "text" }
      name={name}
      onChange={onChange}/>

    </div>
  )
}

export default Input