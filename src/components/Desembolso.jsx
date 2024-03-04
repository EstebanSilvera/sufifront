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
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$020.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '25874655', tdoc: "T. Identidad", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Pasaporte", documento: "1048225664", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '51351357', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "T. Identidad", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '85278964', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "T. Identidad", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '28438416', tdoc: "Pasaporte", documento: "1048775668", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "T. Identidad", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '12345678', tdoc: "Pasaporte", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "104877864", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "104877864", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Cédula", documento: "104877864", monto: "$000.000.000" },
    ]);

    const [tabla2] = useState(tabla)

    // const agregarCampo = (event) => {

    //     const numeroAleatorio = Math.floor(Math.random() * 999999999) + 1;
    //     const numeroFormateado = numeroAleatorio.toLocaleString();

    //     if (event.key === 'Enter') {

    //         const documento = document.getElementById("doc").value
    //         const numDocumento = document.getElementById("numdoc").value
    //         const numDescuento = document.getElementById("numdes").value
    //         const desdeFecha = document.getElementById("fecha1").value

    //         const nuevoCampo = { fecha: desdeFecha + " " + hora, desembolso: numDescuento, tdoc: documento, documento: numDocumento, monto: "$" + numeroFormateado };
    //         setTabla([...tabla, nuevoCampo]);
    //     }
    // }

    const descargarComoTexto = () => {
        const contenido = JSON.stringify(tabla, null, 2);
        const blob = new Blob([contenido], { type: 'text/plain' });
        saveAs(blob, 'datos.txt');
    };

    const [documento, setDocumento] = useState('');
    const [numDocumento, setNumDocumento] = useState('');
    const [numDesembolso, setNumDesembolso] = useState('');
    const [desdeFecha, setDesdeFecha] = useState('');
    const [desdeFecha2, setDesdeFecha2] = useState('');

    const [cancel, setCancel] = useState([]);

    let tablafiltro = tabla

    const filtrar = () => {

        const doc = [documento, numDocumento, numDesembolso, desdeFecha, desdeFecha2]
        const docfil = doc.filter((palabra) => palabra !== "")

        tablafiltro = tabla.filter(item =>
            item.tdoc.includes(documento) &&
            item.desembolso.includes(numDesembolso) &&
            item.documento.includes(numDocumento) &&
            item.fecha.includes(desdeFecha)
        );

        setTabla(tablafiltro)

        setCancel(docfil)

        console.log(cancel)
    }

    const Borrar = () => {
        console.log("borraste los input")
        setDocumento("")
        setNumDesembolso("")
        setNumDocumento("")
        setNumDocumento("")
        setDesdeFecha("")
        setDesdeFecha2("")

        setTabla(tabla2)

        setCancel([])
    }

    const handleInput = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');

        const formattedValue = inputValue.replace(/^(.{2})(.{2})(.*)$/, '$1-$2-$3');

        e.target.value = formattedValue;
    };

    return (
        <div>

            <div className='desembolso'>

                <div className='nav-desembolso flex justify-between items-center xl:mt-0 xl:mb-0 mt-7 mb-7'>

                    <img className='sufi-desembolso xl:ml-[598px] xl:mr-[430.89px] ml-5 ' src={sufi} alt='' />

                    <div onClick={() => salir()} className='flex justify-center items-center cursor-pointer mr-[24px] w-[156px] h-[48px]'>
                        <button className='font-sans font-bold mr-[10px] text-sm text-[#31323F]'>
                            Cerrar sesión
                        </button>
                        <FaArrowRightToBracket className='size-6 text-[#31323F]' />
                    </div>

                </div>

                <div className='nav-descargar flex justify-between items-center' style={{background:"linear-gradient(#D1E8FF74 1%, white 10%)"}}>

                    <p className=' font-sans font-bold text-xl xl:my-[10px] xl:ml-[2.5vw] text-[#413E4D] my-8 ml-10' >
                        Mis desembolsos
                    </p>
                    <button
                        className='bg-[#DD3542] rounded-full w-[176px] h-[48px] mr-[2.5vw] text-[14px] text-white font-sans font-semibold'
                        onClick={() => descargarComoTexto()}
                        type="submit">
                        <TfiDownload className='absolute size-6 mx-[12px] mr-[140px]' />
                        Descargar
                    </button>
                </div>

                <div onChange={filtrar} className='nav-checkbox flex flex-wrap items-center xl:ml-0 ml-6 xl:mb-0 '>

                    {
                        (cancel.length > 0)
                            ?
                            <MdCancel onClick={() => Borrar()} className='absolute xl:-ml-[2.8rem] xl:mt-0 xl:size-6 size-10 text-[#DD3542] ml-[17rem] mt-32' />
                            :
                            <></>
                    }

                    <FloatingLabel
                        label={documento ? 'Tipo doc.' : ''}
                        className={`text-[#ABB9C7] xl:mr-0 mr-5 my-1 ${documento ? 'text-sm text-[#ABB9C7]' : 'text-base'}`}
                    >
                        <Form.Select
                            id='doc'
                            className='xl:w-[176px] xl:h-[56px] text-[#413E4D] w-48'
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}

                        >
                            <option> </option>
                            <option value="Cédula">Cédula</option>
                            <option value="T. Identidad">T. identidad</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </Form.Select>
                        {
                            documento === ""
                                ?
                                <p className='absolute top-[18px] left-[16px]' style={{ pointerEvents: "none" }}>Tipo doc.</p>
                                :
                                <></>
                        }
                        <MdOutlineKeyboardArrowDown
                            className='size-6 bg-white absolute xl:top-[1.2rem] xl:ml-[8.75rem] text-[#DD3542] pointer-events-none ml-40 top-[1.1rem]'
                        />

                    </FloatingLabel>

                    <FloatingLabel
                        label="Número de documento"
                        className='text-[#ABB9C7] xl:mr-0 mr-5 my-1'
                    >
                        <Form.Control className='xl:w-[272px] xl:h-[56px] w-48' id='numdoc' placeholder="Número de documento" value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Número de desembolso"
                        className='text-[#ABB9C7] xl:mr-0 mr-5 my-1'
                    >
                        <Form.Control className='xl:w-[272px] xl:h-[56px] w-48' id='numdes' placeholder="Número de desembolso" value={numDesembolso} onChange={(e) => setNumDesembolso(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Desde"
                        className='text-[#ABB9C7] xl:mr-0 mr-5 my-1'
                    >
                        <Form.Control className='xl:w-[176px] xl:h-[56px] w-48' id='fecha1' placeholder="00-00-0000" value={desdeFecha} maxLength={10} onInput={handleInput} onChange={(e) => setDesdeFecha(e.target.value)} />
                        <FaRegCalendarDays style={{ position: "absolute", top: "1rem", marginLeft: "8.5rem", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Hasta"
                        className='text-[#ABB9C7] xl:mr-0 mr-5 my-1'
                    >
                        <Form.Control className='xl:w-[176px] xl:h-[56px] w-48' id='fecha2' placeholder="00-00-0000" value={desdeFecha2} maxLength={10} onInput={handleInput} onChange={(e) => setDesdeFecha2(e.target.value)} />
                        <FaRegCalendarDays style={{ position: "absolute", top: "1rem", marginLeft: "8.5rem", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />
                    </FloatingLabel>
                    {/* <input id='fecha2' type='date' onKeyDown={agregarCampo} onChange={() => alert("undir enter para guardar")} className='check' style={{ width: "176px", height: "56px" }} placeholder="Hasta" /> */}
                </div>

                <section className='bg-[#F1F6FB] xl:w-[1278px] xl:h-[48px] h-16 flex justify-evenly items-center'>
                    <p className='xl:py-[12px] xl:w-[276px] xl:ml-[72px] font-sans font-bold text-[#413E4D] text-sm ml-3 '>Fecha y hora</p>
                    <p className='xl:py-[12px] xl:w-[240px] font-sans font-bold text-[#413E4D] text-sm '>Número de desembolso</p>
                    <p className='xl:py-[12px] xl:w-[236px] font-sans font-bold text-[#413E4D] text-sm '>Tipo de documento</p>
                    <p className='xl:py-[12px] xl:w-[256px] font-sans font-bold text-[#413E4D] text-sm '>Número de documento</p>
                    <p className='xl:py-[12px] xl:w-[176px] xl:mr-[24px] font-sans font-bold text-[#413E4D] text-sm mr-8'>Monto</p>
                </section>

                <div className='xl:h-[502px] xl:w-[101.5%] overflow-y-scroll xl:pb-24 h-80 ' style={{ scrollbarColor: 'transparent transparent' }}>
                    <table className='mi-tabla w-full table-fixed overflow-hidden '>
                        <tbody>
                            {
                                tablafiltro.map((p, i) => (
                                    <tr key={i} className='xl:flex xl:justify-center xl:items-center' style={{ height: "48px", color: "#8E8E8E", fontSize: "14px" }}>
                                        <td className='xl:w-[275px] xl:ml-[72px] p-0 xl:py-[16px] '>{p.fecha}</td>
                                        <td className='xl:w-[240px] p-0'>{p.desembolso}</td>
                                        <td className='xl:w-[236px] p-0'>{p.tdoc}</td>
                                        <td className='xl:w-[256px] p-0'>{p.documento}</td>
                                        <td className='xl:w-[176px] p-0 xl:mr-[24px] font-sans font-bold'>{p.monto}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                {/*############################################### PAGINAS CON POSITION RELATIVE ############################################### */}

                <div className='paginacion relative xl:top-[-5rem] flex justify-center items-center top-4'>

                    <div className='numeroPaginacion flex justify-center items-center'>

                        <div style={{ padding: "10px" }}>
                            <MdOutlineKeyboardArrowLeft onClick={() => (pagination === 1) ? setPagination(1) : setPagination(pagination - 1)} style={{ color: "#DD3542", width: "24px", height: "24px", cursor: "pointer" }} />
                        </div>

                        <div style={{ width: "48px", height: "48px", border: "1px solid #ABB9C780", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {pagination}
                        </div>

                        <p className='w-16' style={{ fontSize: "16px", margin: "0", padding: "10px", font: "arial, Lato", color: "#414141", fontWeight: "Regular" }}>de 10</p>

                        <div >
                            <MdOutlineKeyboardArrowRight onClick={() => (pagination === 10) ? setPagination(10) : setPagination(pagination + 1)} style={{ color: "#DD3542", width: "24px", height: "24px", cursor: "pointer" }} />
                        </div>
                    </div>

                    <div className='checkPaginacion text-[#ABB9C7] '>
                        <FloatingLabel label="Registros por página">
                            <Form.Select className='focus:outline-none focus:shadow-outline-blue focus:border-blue-300 xl:w-[268px] xl:h-[56px] w-44'>
                                <option>{tabla.length}</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <MdOutlineKeyboardArrowDown className='absolute size-6 bg-white xl:top-[1.2rem] xl:ml-[14.5rem] text-[#DD3542] pointer-events-none top-4 ml-36' />
                        </FloatingLabel>
                    </div>
                </div>

                <div className=' flex justify-end'>

                    <div id="miDiv" className='animacion-login-2 mensaje xl:relative xl:mr-20 xl:top-[-13.3rem] xl:w-[236px] xl:h-[108px] rounded-xl fixed w-48 bg-white top-[85%] mr-5 items-center z-50'>

                        <p className='text-[#413E4D] m-[20px] text-sm font-sans font-normal '>
                            Pedro Pérez ha hecho<br /> una compra por valor de <strong>$1.800.000</strong>
                        </p>

                        <div onClick={() => cerrar()} id="toggleButton" className='cursor-pointer ' >
                            <MdCancel className='absolute text-[#DD3542] size-6 xl:top-[-0.5rem] xl:left-[13.8rem] left-44 -top-2' />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Desembolso