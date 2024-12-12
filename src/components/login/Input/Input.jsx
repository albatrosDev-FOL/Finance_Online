import React from 'react'
import "./Input.css"

function Input({type}) {
  const typeModificado = `${type}`  
  return (
    <div className='inputs'>
        
   
      <input
      type={ type || "text" }/>

    </div>
  )
}

export default Input