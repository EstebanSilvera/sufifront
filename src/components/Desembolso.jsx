import { useEffect, useState } from 'react'
import sufi from "../img/sufi.png"
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { FaArrowRightToBracket, FaRegCalendarDays } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowDown, MdCancel } from 'react-icons/md'
import { TfiDownload } from 'react-icons/tfi'
import { saveAs } from 'file-saver';

const salir = () => {

    let confirmar = window.confirm("¿Quieres continuar?");

    if (confirmar) {
        window.location.href = "/";
    } else {
        alert("Presionaste 'No'");
    }
}

const Desembolso = () => {

    const [hora, setHora] = useState('');

    useEffect(() => {
        const intervalo = setInterval(() => {
            const fechaActual = new Date();
            const horaFormateada = fechaActual.toLocaleTimeString();
            setHora(horaFormateada);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const cerrar = () => {
        let div = document.getElementById("miDiv")
        document.getElementById("toggleButton").addEventListener("click", function () {
            if (div.style.visibility === "visible") {
                div.style.visibility = "hidden";
            } else {
                div.style.visibility = "visible";
            }
        });
    }

    useEffect(() => {
        cerrar()
    }, [])

    const [pagination, setPagination] = useState(1)

    const [tabla, setTabla] = useState([
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
    ]);

    const agregarCampo = (event) => {

        const numeroAleatorio = Math.floor(Math.random() * 999999999) + 1;
        const numeroFormateado = numeroAleatorio.toLocaleString();

        if (event.key === 'Enter') {

            const documento = document.getElementById("doc").value
            const numDocumento = document.getElementById("numdoc").value
            const numDescuento = document.getElementById("numdes").value
            const desdeFecha = document.getElementById("fecha1").value

            const nuevoCampo = { fecha: desdeFecha + " " + hora, desembolso: numDescuento, tdoc: documento, documento: numDocumento, monto: "$" + numeroFormateado };
            setTabla([...tabla, nuevoCampo]);
        }
    }


    const descargarComoTexto = () => {
        const contenido = JSON.stringify(tabla, null, 2);
        const blob = new Blob([contenido], { type: 'text/plain' });
        saveAs(blob, 'datos.txt');
    };

    return (
        <div>

            <div className='desembolso'>

                <div className='nav-desembolso'>

                    <img className='sufi-desembolso ml-[598px] mr-[430.89px]' src={sufi} alt='' />

                    <div onClick={() => salir()} className='flex justify-center items-center cursor-pointer'>
                        <button className='my-[26px] font-sans font-bold mr-[12px] text-sm'>
                            Cerrar sesión
                        </button>
                        <FaArrowRightToBracket className='size-6' />
                    </div>
                </div>

                <div className='nav-descargar'>

                    <p style={{ fontSize: "20px", fontFamily: "Arial, Open Sans", fontWeight: "bold", color: "#413E4D", marginLeft: "4vh", padding: "1vw" }}>
                        Mis desembolsos
                    </p>
                    <button
                        className='bg-[#DD3542] rounded-full w-[176px] h-[48px] text-[14px] text-white font-sans font-semibold'
                        onClick={() => descargarComoTexto()}
                        type="submit">
                        <TfiDownload className='absolute size-6 mx-[12px] mr-[140px]' />
                        Descargar
                    </button>
                </div>

                <div className='nav-checkbox'>

                    <select id='doc' className='check' style={{ width: "176px", height: "56px", appearance: "none", color: "#ABB9C7" }} >
                        <option >Tipo doc.</option>
                        <option value="Cedula">Cedula</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="T. Identidad">T. Identidad</option>
                    </select>

                    <input id='numdoc' className='check' style={{ width: "272px", height: "56px" }} placeholder="Número de documento" />

                    <input id='numdes' className='check' style={{ width: "272px", height: "56px" }} placeholder="Número de desembolso" />
                    <input id='fecha1' type='date' className='check' style={{ width: "172px", height: "56px" }} placeholder="Desde" />
                    <input id='fecha2' type='date' onKeyDown={agregarCampo} onChange={() => alert("undir enter para guardar")} className='check' style={{ width: "172px", height: "56px" }} placeholder="Hasta" />

                </div>

                <div className='scroll-tabla'>

                    <table className='mi-tabla' >
                        <thead>
                            <tr style={{ height: "48px", background: "#F1F6FB" }}>
                                <th className='letras' style={{ paddingLeft: "4vw", width: "276", height: "16" }}>Fecha y hora</th>
                                <th className='letras' style={{ width: "240", height: "16" }}>Número de desembolso</th>
                                <th className='letras' style={{ width: "236", height: "16" }} >Tipo de documento</th>
                                <th className='letras' style={{ width: "256", height: "16" }} >Número de documento</th>
                                <th className='letras' style={{ paddingRight: "4vw", width: "176", height: "16" }}>Monto</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tabla.map((p) => (
                                    <tr style={{ height: "48px", color: "#8E8E8E", fontSize: "14px" }}>
                                        <td style={{ paddingLeft: "4vw" }}>{p.fecha}</td>
                                        <td>{p.desembolso}</td>
                                        <td>{p.tdoc}</td>
                                        <td>{p.documento}</td>
                                        <td style={{ fontWeight: "bold" }}>{p.monto}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

                </div>


                {/*############################################### PAGINAS CON POSITION RELATIVE ############################################### */}

                <div className='paginacion'>

                    <div className='numeroPaginacion'>
                        <div style={{ padding: "10px" }}>
                            <MdOutlineKeyboardArrowLeft onClick={() => (pagination === 1) ? setPagination(1) : setPagination(pagination - 1)} style={{ color: "#DD3542", width: "24px", height: "24px" }} />
                        </div>

                        <div style={{ width: "48px", height: "48px", border: "1px solid #ABB9C780", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {pagination}
                        </div>

                        <p style={{ fontSize: "16px", margin: "0", padding: "10px", font: "arial, Lato", color: "#414141", fontWeight: "Regular" }}>de 10</p>

                        <div style={{ padding: "10px" }}>
                            <MdOutlineKeyboardArrowRight onClick={() => (pagination === 10) ? setPagination(10) : setPagination(pagination + 1)} style={{ color: "#DD3542", width: "24px", height: "24px" }} />
                        </div>
                    </div>

                    <div className='checkPaginacion'>
                        <FloatingLabel label="Registros por página">
                            <Form.Select style={{ width: "268px", height: "56px" }}>
                                <option>16</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                </div>

                <MdOutlineKeyboardArrowDown style={{ position: "relative", top: "-43em", left: "13em", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none" }} />
                <FaRegCalendarDays style={{ position: "relative", top: "-43em", left: "60.4em", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />
                <FaRegCalendarDays style={{ position: "relative", top: "-43em", left: "70.8em", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />


                <div id="miDiv" className='mensaje'>

                    <p style={{ fontSize: "14px", margin: "0", fontFamily: "Arial, Open Sans", color: "#413E4D", width: "180px" }}>
                        Pedro Pérez ha hecho <br />una compra por valor de <br /> <div style={{ color: "#413E4D", fontFamily: "Arial, Open Sans", fontWeight: "bold" }}>$1.800.000</div>
                    </p>

                    <div onClick={() => cerrar()} id="toggleButton" style={{ pointerEvents: "auto" }}>
                        <MdCancel style={{ position: "relative", color: "#DD3542", width: "24px", height: "24px", top: "-3.2em", left: "1.5em" }} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Desembolso