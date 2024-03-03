import React, { useEffect } from 'react'
import '../style/style.css'
import sufi from "../img/sufi.png"
import { Form, FloatingLabel, Modal } from 'react-bootstrap';
import punto from "../img/197.png"
import fondo2 from "../img/32967.png"
import ochoPuntos from "../img/36052.png"
import { useState } from 'react';

const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [userRegistro, setUserRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');

  const [error, setError] = useState("")
  const [error2, setError2] = useState("")

  const [users, setUsers] = useState([{
    user: "esteban@gmail.com",
    password: "123456"
  },
  {
    user: "silvera@gmail.com",
    password: "456789"
  }
  ])


  const Sesion = () => {

    console.log(user, password)

    const usuario = users.filter(item => item.user === user && item.password === password)

    if (usuario.length !== 0) {
      if (user === usuario[0].user && password === usuario[0].password) {
        window.location.href = "/Desembolso"
      }
    } else {
      alert("Contraseña o correo incorrecto")
    }

  }

  console.log(users)

  const handleSubmit = (e) => {
    e.preventDefault();

    (!user) ? setError('border-red-500') : setError('');

    (!password) ? setError2('border-red-500') : setError2('');


    if (user && password) {
      Sesion();
    } else {
      alert("Contraseña o correo incorrecto")
    }
  };

  const Registro = (e) => {

    e.preventDefault();

    console.log(userRegistro)

    if (userRegistro && passwordRegistro) {
      setUsers([...users, { user: userRegistro, password: passwordRegistro }])
      alert("Registrado")
      setModalShow(false)
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  };

  const [modalShow, setModalShow] = useState(false);

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
            <form onSubmit={handleSubmit}>
              <FloatingLabel className='mb-[12px] text-[#ABB9C7]' label="Usuario">
                <Form.Control
                  className={`w-[368px] h-[56px] ${error || 'border-[#ABB9C780]'} rounded-md`}
                  type="email"
                  placeholder="name@example.com"
                  id='user'
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel className='text-[#ABB9C7]' label="Contraseña">
                <Form.Control
                  className={`w-[368px] h-[56px] ${error2 || 'border-[#ABB9C780]'} rounded-md`}
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <button type="submit" className='relative w-[174px] bg-[#DD3542] rounded-full h-[48px] font-sans font-semibold text-white mt-[48px]'>
                INGRESAR
              </button>
            </form>
          </div>
          <div className='relative mx-auto w-[336px] h-[16px] mt-[104px] text-xs font-sans text-[#413E4D] '>
            <u onClick={() => setModalShow(true)} style={{ cursor: "pointer" }}>No recuerdo mi contraseña</u>
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

      <Modal
        show={modalShow} onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Registro de usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-5'>
          <form onSubmit={Registro}>
            <FloatingLabel className='mb-[30px] text-[#ABB9C7]' label="Usuario">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={userRegistro}
                onChange={(e) => setUserRegistro(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel className='text-[#ABB9C7]' label="Contraseña">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={passwordRegistro}
                onChange={(e) => setPasswordRegistro(e.target.value)}
              />
            </FloatingLabel>
            <div className='flex justify-center items-center pt-10'>
              <button type='submit' className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                Registrarse
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setModalShow(false)}>Close</button>
        </Modal.Footer>
      </Modal>

    </div >
  )
}


export default Login