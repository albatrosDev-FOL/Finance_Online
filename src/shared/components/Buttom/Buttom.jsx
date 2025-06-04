import "./Buttom.css"
import React from 'react'

const Buttom = ({type ="button",children}) => {

  
  return (
    <button className='buttom' type={type}>
        {children}

    </button>

  )
}

export default Buttom
 