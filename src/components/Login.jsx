import React from 'react'
import '../style/style.css'
import sufi from "../img/sufi.png"
import { Form, FloatingLabel } from 'react-bootstrap';
import punto from "../img/197.png"
import fondo from "../img/32966.png"
import fondo2 from "../img/32967.png"
import ochoPuntos from "../img/36052.png"
import { useState } from 'react';

const Login = () => {

  const [error, setError] = useState("")
  const [error2, setError2] = useState("")

  const Sesion = () => {

    const user = document.getElementById("user").value
    const password = document.getElementById("password").value

    console.log(user, password)

    if (user !== "" && password !== "") {
      window.location.href = "/Desembolso"
    } else {
      setError("border-[#DD3542]")
      setError2("border-[#DD3542]")
      alert("Contraseña o correo incorrecto")
    }

  }

  console.log(error)
  return (
    <div>

      <div className='login mx-auto bg-white' style={{ backgroundImage: `url(${fondo2})`, overflow: "hidden" }}>

        <div className='form'>

          <div className='w-[368px] h-[164px] mb-[32px] mx-[16px]'>

            <img className='relative left-[52px] ' style={{ width: "263.65px", height: "76px" }} src={sufi} alt='sufi' />

            <p className='font-sans font-bold left-[16px] w-[368px] h-[48px] text-[40px] text-[#413E4D] mb-[8px] mt-[12px]'>Sufipay</p>

            <p className='font-sans w-[368px] h-[20px] text-[16px] text-[#413E4D]' style={{ color: "#413E4D" }}>Administrador comercial</p>
          </div>

          <div className='email'>
            <FloatingLabel className='mb-[12px] text-[#ABB9C7]' label="Usuario"  >
              <Form.Control className={`w-[368px] h-[56px] ${(error === "" ? 'border-[#ABB9C780]' : error)} rounded-md `} type="email" placeholder="name@example.com" id='user' />
            </FloatingLabel>
            <FloatingLabel className='text-[#ABB9C7]' label="Contraseña">
              <Form.Control className={`w-[368px] h-[56px] ${(error2 === "" ? 'border-[#ABB9C780]' : error2)} rounded-md`} type="password" placeholder="Contraseña" id="password" />
            </FloatingLabel>
            <button onClick={() => Sesion()} className='relative w-[174px] bg-[#DD3542] rounded-full h-[48px] font-sans font-semibold text-white mt-[48px]' variant="danger" type="submit">
              INGRESAR
            </button>
          </div>
          <div className='relative mx-auto w-[336px] h-[16px] mt-[104px] text-xs font-sans text-[#413E4D] '>
            <u>No recuerdo mi contraseña</u>
          </div>

        </div>

      </div>


      {/* <img className='absolute -top-14 right-7 z-0' src={fondo} alt='fondo' /> */}


      <div>
        <img className='ochopuntos' src={ochoPuntos} alt='' />
        <img className='ochopuntos2' src={ochoPuntos} alt='' />
      </div>

      {/* <div className='position-fondo2'>
          <img className='fondo' src={fondo} alt='' />
        </div> */}

      <div>
        <img className='puntos' src={punto} alt='' />

        <img className='puntos2' src={punto} alt='' />
      </div>



    </div>
  )
}

export default Login