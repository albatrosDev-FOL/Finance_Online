import Buttom from '../Buttom/Buttom';
import Input from '../Input/Input';
import React from 'react';
import logoimg from '../../../assets/image/Login.jpg';
import "./Form.css"



const Form = () => {
  return (
    <section className='register'>
      <form>
      <img src={logoimg} className='logo'/>
      <h2>Usuario</h2>
      <Input/>
      <h2> Contraseña</h2>
      <Input type="password"/>
      <a>¿Olvidola contraseña?</a>
      <Buttom/>
      </form>
    </section>
  );

};



export default Form;
