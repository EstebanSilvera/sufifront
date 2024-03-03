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
        { fecha: "00-00-0000 00:00:00", desembolso: '12345678', tdoc: "Cédula", documento: "0000000000", monto: "$000.000.000" },
        { fecha: "00-00-0000 00:00:00", desembolso: '00000000', tdoc: "Pasaporte", documento: "104877864", monto: "$000.000.000" },
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
            item.desembolso.includes(numDesembolso) &&
            item.tdoc.includes(documento) &&
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

                <div className='nav-desembolso'>

                    <img className='sufi-desembolso ml-[598px] mr-[430.89px]' src={sufi} alt='' />

                    <div onClick={() => salir()} className='flex justify-center items-center cursor-pointer mr-[24px] w-[156px] h-[48px]'>
                        <button className='font-sans font-bold mr-[10px] text-sm text-[#31323F]'>
                            Cerrar sesión
                        </button>
                        <FaArrowRightToBracket className='size-6 text-[#31323F]' />
                    </div>

                </div>

                <div className='nav-descargar'>

                    <p className=' font-sans font-bold text-xl my-[10px] ml-[2.5vw] text-[#413E4D]' >
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

                <div onChange={filtrar} className='nav-checkbox'>

                    {
                        (cancel.length > 0)
                            ?
                            <MdCancel onClick={() => Borrar()} className='absolute -ml-[2.8rem] size-6 text-[#DD3542]' />
                            :
                            <></>
                    }

                    <FloatingLabel
                        label={documento ? 'Tipo doc.' : ''}
                        className={`text-[#ABB9C7] ${documento ? 'text-sm text-[#ABB9C7]' : 'text-base'}`}
                    >
                        <Form.Select
                            id='doc'
                            style={{ width: "176px", height: "56px", color: "#413E4D" }}
                            type="number"
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
                            className='size-6 bg-white'
                            style={{ position: "absolute", top: "1.2rem", marginLeft: "8.75rem", color: "#DD3542", pointerEvents: "none" }}
                        />

                    </FloatingLabel>

                    <FloatingLabel
                        label="Número de documento"
                        style={{ width: "272px", height: "56px" }}
                        className='text-[#ABB9C7]'
                    >
                        <Form.Control id='numdoc' placeholder="Número de documento" value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Número de desembolso"
                        style={{ width: "272px", height: "56px" }}
                        className='text-[#ABB9C7]'
                    >
                        <Form.Control id='numdes' placeholder="Número de desembolso" value={numDesembolso} onChange={(e) => setNumDesembolso(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Desde"
                        style={{ width: "176px", height: "56px" }}
                        className='text-[#ABB9C7]'
                    >
                        <Form.Control id='fecha1' placeholder="00-00-0000" value={desdeFecha} maxLength={10} onInput={handleInput} onChange={(e) => setDesdeFecha(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Hasta"
                        style={{ width: "176px", height: "56px" }}
                        className='text-[#ABB9C7]'
                    >
                        <Form.Control id='fecha2' placeholder="00-00-0000" value={desdeFecha2} maxLength={10} onInput={handleInput} onChange={(e) => setDesdeFecha2(e.target.value)} />
                    </FloatingLabel>
                    {/* <input id='fecha2' type='date' onKeyDown={agregarCampo} onChange={() => alert("undir enter para guardar")} className='check' style={{ width: "176px", height: "56px" }} placeholder="Hasta" /> */}

                    <FaRegCalendarDays style={{ position: "absolute", marginLeft: "56.5rem", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />
                    <FaRegCalendarDays style={{ position: "absolute", marginLeft: "68.5rem", color: "#DD3542", width: "24px", height: "24px", pointerEvents: "none", backgroundColor: "white" }} />
                </div>

                <section className='bg-[#F1F6FB] w-[1280px] h-[48] flex justify-center items-center'>
                    <p className='py-[12px] w-[276px] ml-[72px] font-sans font-bold text-[#413E4D] text-sm'>Fecha y hora</p>
                    <p className='py-[12px] w-[240px] font-sans font-bold text-[#413E4D] text-sm'>Número de desembolso</p>
                    <p className='py-[12px] w-[236px] font-sans font-bold text-[#413E4D] text-sm'>Tipo de documento</p>
                    <p className='py-[12px] w-[256px] font-sans font-bold text-[#413E4D] text-sm'>Número de documento</p>
                    <p className='py-[12px] w-[176px] mr-[24px] font-sans font-bold text-[#413E4D] text-sm'>Monto</p>
                </section>

                <div className='h-[505px] w-[101.5%] overflow-y-scroll pb-24' style={{ scrollbarColor: 'transparent transparent' }}>
                    <table className='mi-tabla w-full table-fixed overflow-hidden'>
                        <tbody>
                            {
                                tablafiltro.map((p, i) => (
                                    <tr key={i} className='flex justify-center items-center' style={{ height: "48px", color: "#8E8E8E", fontSize: "14px" }}>
                                        <td className='w-[275px] ml-[72px] p-0 py-[16px]'>{p.fecha}</td>
                                        <td className='w-[240px] p-0'>{p.desembolso}</td>
                                        <td className='w-[236px] p-1'>{p.tdoc}</td>
                                        <td className='w-[256px] p-1'>{p.documento}</td>
                                        <td className='w-[176px] p-1 mr-[24px] font-sans font-bold'>{p.monto}</td>
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
                            <MdOutlineKeyboardArrowLeft onClick={() => (pagination === 1) ? setPagination(1) : setPagination(pagination - 1)} style={{ color: "#DD3542", width: "24px", height: "24px", cursor: "pointer" }} />
                        </div>

                        <div style={{ width: "48px", height: "48px", border: "1px solid #ABB9C780", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {pagination}
                        </div>

                        <p style={{ fontSize: "16px", margin: "0", padding: "10px", font: "arial, Lato", color: "#414141", fontWeight: "Regular" }}>de 10</p>

                        <div style={{ padding: "10px" }}>
                            <MdOutlineKeyboardArrowRight onClick={() => (pagination === 10) ? setPagination(10) : setPagination(pagination + 1)} style={{ color: "#DD3542", width: "24px", height: "24px", cursor: "pointer" }} />
                        </div>
                    </div>

                    <div className='checkPaginacion text-[#ABB9C7]'>
                        <FloatingLabel label="Registros por página">
                            <Form.Select className='focus:outline-none focus:shadow-outline-blue focus:border-blue-300' style={{ width: "268px", height: "56px" }}>
                                <option>16</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <MdOutlineKeyboardArrowDown className='size-6 bg-white' style={{ position: "absolute", top: "1.2rem", marginLeft: "14.5rem", color: "#DD3542", pointerEvents: "none" }} />
                        </FloatingLabel>
                    </div>
                </div>

                <div id="miDiv" className='mensaje'>

                    <p className='text-[#413E4D] m-[20px] text-sm font-sans font-normal'>
                        Pedro Pérez ha hecho<br /> una compra por valor de <strong>$1.800.000</strong>
                    </p>

                    <div onClick={() => cerrar()} id="toggleButton" style={{ pointerEvents: "auto" }}>
                        <MdCancel style={{ position: "relative", color: "#DD3542", width: "24px", height: "24px", top: "-3.2rem", left: "0.5rem" }} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Desembolso