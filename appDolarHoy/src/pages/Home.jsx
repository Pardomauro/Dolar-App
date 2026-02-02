import { useState } from "react";
import useCotizacion from "../hooks/useCotizacion";
import { formatDate } from "../utils/formatDate";
import { convertCurrency } from "../utils/convertCurrency";



function Home() {
    const [casa, setCasa] = useState("");
    const [moneda, setMoneda] = useState("");

    const { data, loading, error } = useCotizacion(casa || null);
    const { data: dataMoneda, loading: loadingMoneda, error: errorMoneda } = useCotizacion("cotizaciones", moneda || null);

    const [monto, setMonto] = useState("");
    const [monedaConvertir, setMonedaConvertir] = useState("oficial");

    const { data: dataConversor } = useCotizacion(
        monedaConvertir === "oficial" ? "oficial" : "cotizaciones",
        monedaConvertir === "oficial" ? null : monedaConvertir
    )



    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center py-10 px-2 font-sans bg-green-900/80"
            style={{
                backgroundImage: 'url(/fondoApp.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >

            <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-blue-200">
                <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-2 text-center tracking-tight drop-shadow-lg">Cotización del Dólar Hoy</h1>
                <p className="text-green-900 text-base md:text-lg mb-6 text-center">Consultá a cuánto está el dólar hoy en Argentina</p>

                <select
                    className="w-full p-3 border border-black rounded-lg mb-4 bg-white text-black font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    value={casa}
                    onChange={(e) => setCasa(e.target.value)}
                >
                    <option value="">Seleccione el tipo de dólar</option>
                    <option value="oficial">Oficial</option>
                    <option value="blue">Blue</option>
                    <option value="contadoconliqui">Contado con Liquidación</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="mayorista">Mayorista</option>
                    <option value="cripto">Cripto</option>
                </select>

                <div className="min-h-[110px] flex flex-col justify-center items-center w-full">
                    {casa && loading && (
                        <div className="flex justify-center my-4">
                            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {casa && error && (
                        <p className="text-red-600 text-center font-semibold">Error: {error}</p>
                    )}
                    {casa && data && (
                        <div className=" w-full bg-white rounded-xl p-6 mt-4 text-center shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-100">
                            <p className="text-lg font-semibold text-black">Compra: <span className="font-bold">{data.compra}</span></p>
                            <p className="text-lg font-semibold text-black">Venta: <span className="font-bold">{data.venta}</span></p>
                            <p className="text-xs text-black mt-2">Actualización: {formatDate(data.fechaActualizacion)}</p>
                        </div>
                    )}
                    {/* Espacio reservado si no hay selección */}
                    {!casa && <div className="h-8"></div>}
                </div>
            </div>

            <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-4 text-center">¿Te interesaría consultar por otra moneda?</h3>
                <select
                    className="w-full p-3 border border-black rounded-lg mb-4 bg-white text-black font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    value={moneda}
                    onChange={e => setMoneda(e.target.value)}
                >
                    <option value="">Seleccione una moneda</option>
                    <option value="EUR">Euro</option>
                    <option value="BRL">Real Brasileño</option>
                    <option value="CLP">Peso Chileno</option>
                    <option value="UYU">Peso Uruguayo</option>
                </select>

                <div className="min-h-[110px] flex flex-col justify-center items-center w-full">
                    {moneda && loadingMoneda && (
                        <div className="flex justify-center my-4">
                            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {moneda && errorMoneda && (
                        <p className="text-red-600 text-center font-semibold">Error: {errorMoneda}</p>
                    )}
                    {moneda && dataMoneda && (
                        <div className="w-full bg-white rounded-xl p-6 mt-4 text-center shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-100">
                            <p className="text-lg font-semibold text-black">Compra: <span className="font-bold">{dataMoneda.compra}</span></p>
                            <p className="text-lg font-semibold text-black">Venta: <span className="font-bold">{dataMoneda.venta}</span></p>
                            <p className="text-xs text-black mt-2">Actualización: {formatDate(dataMoneda.fechaActualizacion)}</p>
                        </div>
                    )}
                    {/* Espacio reservado si no hay selección */}
                    {!moneda && <div className="h-8"></div>}
                </div>
            </div>

            <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mt-10 border border-green-200">
                <h1 className="text-2xl font-bold text-green-900 mb-4 text-center">Realiza una conversión</h1>
                <input className="w-full p-3 border border-black rounded-lg mb-4 bg-white text-black font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    type="number"
                    placeholder="Ingresa el monto en pesos"
                    value={monto}
                    onChange={e => setMonto(e.target.value)}
                />

                <h3 className="mb-2 text-green-900 text-center font-bold text-sm">Selecciona la moneda a convertir:</h3>

                <select className="w-full p-3 border border-black rounded-lg mb-4 bg-white text-black font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    value={monedaConvertir}
                    onChange={e => setMonedaConvertir(e.target.value)}
                >
                    <option value="oficial">Dólar Estadounidense (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="BRL">Real Brasileño (BRL)</option>
                    <option value="CLP">Peso Chileno (CLP)</option>
                    <option value="UYU">Peso Uruguayo (UYU)</option>
                </select>


                {monto && dataConversor && (
                    <div className="w-full mt-4 text-center">
                        <p className="text-lg font-semibold text-black">
                            {monto} ARS = {convertCurrency(monto, dataConversor.venta)} {dataConversor.moneda}
                        </p>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Home   
