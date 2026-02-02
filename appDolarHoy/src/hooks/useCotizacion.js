import { useState, useEffect } from 'react';

function useCotizacion(casa, moneda) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        if (!casa) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = '';
                let result = null;

                const validDolares = ["oficial", "blue", "contadoconliqui", "tarjeta", "mayorista", "cripto"];
                if (casa !== "cotizaciones" && !validDolares.includes(casa)) {
                    setError("Tipo de dólar inválido");
                    setLoading(false);
                    return;
                }

                if (casa === "cotizaciones") {
                    url = `https://dolarapi.com/v1/cotizaciones`;
                    const res = await fetch(url);

                    if (!res.ok) throw new Error('Error en la solicitud');
                    const arr = await res.json();

                    result = arr.find(item => item.moneda === moneda);

                } else {
                    url = `https://dolarapi.com/v1/dolares/${casa}`;
                    const res = await fetch(url);

                    if (!res.ok) throw new Error('Error en la solicitud');

                    result = await res.json();
                }
                setData(result);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [casa, moneda]);

    return { data, loading, error };
}

export default useCotizacion;


